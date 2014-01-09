require 'oauth'

module JBoss
  module Developer
    module Vimeo

      def vimeo(url)
        id = video_id(url)
        title = video_title(id)
        out = "<div class=\"embedded-media\">" +
        "<h4>#{title}</h4>" +
        "<iframe src=\"//player.vimeo.com/video/#{id}\?title=0&byline=0&portrait=0&badge=0&color=2664A2\" width=\"500\" height=\"313\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen}></iframe>"
        cast = video_cast(id)
        cast.each do |c|
          out += "<div class=\"follow-links\">" +
          "<span class=\"title\">Follow #{first_name(c.realname)}</span>" +
          "<a><i class=\"icon-rss\"></i></a>" +
          "<a><i class=\"icon-facebook\"></i></a>" +
          "<a><i class=\"icon-twitter\"></i></a>" +
          "<a><i class=\"icon-linkedin\"></i></a>" +
          "</div>"
        end
        out + "</div>"
      end

      def first_name(full_name)
        full_name.split[0]
      end

      def video_id(url)
        url.match(/^.*\/(\d*)$/)[1]
      end

      def video_title(video_id)
        body = exec_method "vimeo.videos.getInfo", video_id
        if body 
          JSON.parse(body)["video"][0]["title"]
        else
          "Unable to fetch video info from vimeo"
        end
      end

      def video_cast(video_id)
        body = exec_method "vimeo.videos.getCast", video_id
        cast = []
        if body
          JSON.parse(body)["cast"]["member"].each do |c|
            cast << OpenStruct.new(c)
          end
        end
        cast
      end

      def exec_method(method, video_id)
        if access_token
          query = "http://vimeo.com/api/rest/v2?method=#{method}&video_id=#{video_id}&format=json"
          access_token.get(query).body
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
