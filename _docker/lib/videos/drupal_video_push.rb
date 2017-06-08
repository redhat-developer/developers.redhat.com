require 'faraday'
require 'logger'
require 'json'
require 'uri'
require 'base64'
require 'yaml'


class DrupalVideoPush

  VIDEO_JSON = './video_data/videos.json'
  TAXONOMY_TERMS = './video_data/Taxonomy_Terms.json'

  attr_accessor :opts

  def initialize arg
    @opts = YAML.load_file('./drupal_site_info.yml')[arg]
    @faraday = Faraday.new(:url => "#{@opts['host']}:#{@opts['port']}") do |faraday|
      faraday.request :url_encoded
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
    end

  end

  def login(username, password)
    resp = @faraday.post do |req|
      req.url '/user' + '/' + 'login'
      req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      req.body = URI.encode_www_form([["name", username], ["pass", password], ["form_id", "user_login_form"]])
      if @logger
        @logger.debug "request body: #{req.body}"
      end
    end
    @cookie = resp.headers['set-cookie'].split(';').first
  end

  def token(username, password)
    login username, password
    resp = @faraday.get('rest/session/token', nil, {Cookie: @cookie})
    @token = resp.body if resp.success?
  end

  def post(endpoint, path={}, params = {})
    authorization = Base64.encode64("#{@opts['admin']['name']}:#{@opts['admin']['password']}").gsub("\n", '').freeze
    @faraday.post do |req|
      req.url endpoint + '/' + path
      req.headers['Content-Type'] = 'application/hal+json'
      req.headers['Accept'] = 'application/hal+json'
      req.headers['Authorization'] = "Basic #{authorization}"
      req.headers['X-CSRF-Token'] = @token if @token

      if params.is_a? String
        req.body = params
      else
        req.body = params.to_json
      end
      puts "request body: #{req.body}"
    end
  end

  def execute_post(json)
    if token("#{@opts['admin']['name']}", "#{@opts['admin']['password']}")
      post('entity', 'node', json)
    end

  end

  def hash_from_json file
    data_hash = JSON.parse(File.read(file))
    data_hash
  end


  def tag_matcher tags
    if tags.nil?
      return {}
    end
    tag_list = hash_from_json(TAXONOMY_TERMS)
    tag_hash_array = tags.collect {|v| {v => tag_list.reject {|r| !r['tid'].include?(v)}[0]}}
    returnArray = tag_hash_array.reject {|v| v.values[0].nil?}
    returnArray
  end


  def payload_builder(video_data)
    data = video_data
    path = data['path'].gsub(/\/$/, '')
    payload = {
        title: [{:value => data['title'], :lang => "en"}],
        _links: {type: {href: "#{@opts['host']}:#{@opts['port']}/rest/type/node/video_resource"}}.merge!(taxonomy_layout(tag_matcher(data['tags']))[:links]),
        type: [:target_id => "video_resource"],
        body: [{:value => "#{data['description']}", :format => 'rhd_html'}],
        field_duration: [{:interval => data['seconds'], :period => 'second'}, {:interval => data['minutes'], :period => 'minute'}, {:interval => data['hours'], :period => 'hour'}],
        field_likes: [{:value => data['likes']}],
        field_views: [{:value => data['views']}],
        field_video_resource: [{:value => data['video_url']}],
        field_video_thumbnail_url: [{:value => data['video_thumb']}],
        field_video_publish_date: [{:value => data['publish_date']}],
        field_speakers: [{:value => 'Red Hat Developers'}],
        :_embedded => taxonomy_layout(tag_matcher(data['tags']))[:embedded],
        path: [{:alias => path || "", :lang => "en"}],
        status: [{value: '1', lang: 'en'}]

    }

    puts payload.to_json
    payload
  end

  def taxonomy_layout(tag_array)

    _links = tag_array.collect {|v|
      {:href => "#{@opts['host']}:#{@opts['port']}/taxonomy/term/#{v.values[0]['tid']}?_format=hal_json"}
    }

    _embedded = tag_array.collect {|v|
      [:_links => {:type => {href: "#{@opts['host']}:#{@opts['port']}/rest/type/taxonomy_term/tags"}}, :uuid => [{:value => v.values[0]['uuid']}]]
    }


    {:links => {"#{@opts['host']}:#{@opts['port']}/rest/relation/node/video_resource/field_video_resource_tags" => _links}, :embedded => {"#{@opts['host']}:#{@opts['port']}/rest/relation/node/video_resource/field_video_resource_tags" => _embedded.flatten}}
  end


  def push_drupal_videos

    video_collection = hash_from_json(VIDEO_JSON)

    video_collection.collect do |videos|
      payload = payload_builder(videos)
      execute_post(payload.to_json)

    end
  end


end


if $PROGRAM_NAME == __FILE__
  input = ARGV[0]
  DrupalVideoPush.new(input).push_drupal_videos
end