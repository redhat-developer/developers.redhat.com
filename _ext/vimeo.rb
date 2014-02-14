require 'oauth'

module JBoss
  module Developer
    module Vimeo

      def vimeo(url)
        video = Video.new(url, access_token)
        out = "<div class=\"embedded-media\">" +
        "<h4>#{video.title}</h4>" +
        "<iframe src=\"//player.vimeo.com/video/#{video.id}\?title=0&byline=0&portrait=0&badge=0&color=2664A2\" width=\"500\" height=\"313\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen}></iframe>"
        video.cast.each do |c|
          out += "<div class=\"follow-links\">" +
          "<span class=\"title\">Follow #{first_name(c.realname)}</span>" +
          # TODO wire in follow links
          "<a><i class=\"fa fa-rss\"></i></a>" +
          "<a><i class=\"fa fa-facebook\"></i></a>" +
          "<a><i class=\"fa fa-twitter\"></i></a>" +
          "<a><i class=\"fa fa-linkedin\"></i></a>" +
          "</div>"
        end
        out + "</div>"
      end

      def vimeo_thumb(url)
        video = Video.new(url, access_token)
        out = %Q{<a href="#{site.base_url}/video/vimeo/#{video.id}">} +
        %Q{<img src="#{video.thumb_url}" />} +
        %Q{</a>} +
        %Q{<span class="label material-duration">#{video.duration}</span>} +
        # TODO Add this in once the DCP supports manually adding tags
        # %Q{<span class="label material-level-beginner">Beginner<span>} +
        %Q{<h4><a href="#{thumb_url}">#{video.title}</a></h4>} +
        # TODO Wire in link to profile URL
        %Q{<p class="author">Author: <a href="#">#{video.author.realname}</a></p>} +
        %Q{<p class="material-datestamp">Added #{video.upload_date}</p>} +
        # TODO wire in ratings
        #%Q{<p class="rating">Video<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-empty"></i><i class="fa fa-star-empty"></i></p>} +
        %Q{<div class="body"><p>#{video.description}</p></div>}
        out
      end

      def first_name(full_name)
        full_name.split[0]
      end

      class Video

        def initialize(url, access_token)
          @id = url.match(/^.*\/(\d*)$/)[1]
          @access_token = access_token
          fetch_info
          fetch_cast
          fetch_thumb_url
        end

        def id
          @id
        end

        def title
          @video["title"]
        end

        def duration
          t = @video["duration"].to_i
          Time.at(t).utc.strftime("%T")
        end

        def upload_date
          d = @video["upload_date"]
          DateTime.parse(d).strftime("%F %T")
        end

        def description
          d = @video["description"]
          out = ""
          if d
            i = 0
            max_length = 150
            d.scan(/[^\.!?]+[\.!?]/).map(&:strip).each do |s|
              i += s.length
              if i > max_length
                break
              else
                out += s
              end
            end
          end
          out
        end

        def author
          if @cast[0]
            @cast[0]
          else
            @cast = Openstruct.new({"realname" => "Unknown"})
          end
        end

        def cast
          @cast
        end

        def thumb_url
          @thumb["_content"]
        end

        def fetch_info
          body = exec_method "vimeo.videos.getInfo", @id
          if body
            @video = JSON.parse(body)["video"][0]
          else
            @video = {"title" => "Unable to fetch video info from vimeo"}
          end
        end

        def fetch_thumb_url
          body = exec_method "vimeo.videos.getThumbnailUrls", @id
          if body
            @thumb = JSON.parse(body)["thumbnails"]["thumbnail"][1]
          else
            @thumb = {"_content" => ""}
          end
        end

        def fetch_cast
          body = exec_method "vimeo.videos.getCast", @id
          @cast = []
          if body
            JSON.parse(body)["cast"]["member"].each do |c|
              o = OpenStruct.new(c)
              if o.username != "jbossdeveloper"
                @cast << o
              end
            end
          end
        end


        def exec_method(method, video_id)
          if @access_token
            query = "http://vimeo.com/api/rest/v2?method=#{method}&video_id=#{video_id}&format=json"
            @access_token.get(query).body
          end
        end

      end

      # Exchange your oauth_token and oauth_token_secret for an AccessToken instance.
      def access_token
        if @access_token
          @access_token
        else
          if not ENV['vimeo_client_secret']
            puts 'Cannot fetch video info from vimeo, vimeo_client_secret is missing from environment variables'
            return
          end
          if not site.vimeo_client_id
            puts 'Cannot fetch video info vimeo, vimeo_client_id is missing from _config/site.yml'
            return
          end
          if not ENV['vimeo_access_token_secret']
            puts 'Cannot fetch video info from vimeo, vimeo_access_token_secret is missing from environment variables'
            return
          end
          if not site.vimeo_access_token
            puts 'Cannot fetch video info from vimeo, vimeo_access_token is missing from _config/site.yml'
            return
          end
          consumer = OAuth::Consumer.new(site.vimeo_client_id, ENV['vimeo_client_secret'],
            { :site => "https://vimeo.com",
              :scheme => :header
            })
          # now create the access token object from passed values
          token_hash = { :oauth_token => site.vimeo_access_token,
                         :oauth_token_secret => ENV['vimeo_access_token_secret']
                       }
          OAuth::AccessToken.from_hash(consumer, token_hash )
        end
      end
    end
  end
end
