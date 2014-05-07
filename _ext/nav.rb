
module JBoss::Developer
  module Extensions
    class Nav

      def initialize()
      end

      def execute(site)
        if site.nav
          nav = {}
          site.nav.each do |k, v|
            nav[k.to_s] = build(v, k, site)
          end
          site.nav = nav

          site.pages = site.pages.reject {|p| p.source_path =~ /robots\.txt/} unless site.robots
        end
      end

      def build(object, parent, site)
        r = {} 
        if Hash === object
          r['children'] = {}
          object.each do |key, value|
            if key.to_s == 'label' || key.to_s == 'url' || key.to_s == 'description' || key.to_s == 'video'
              r[key] = value
            else
              r['children'][key] = build(value, key, site)
            end
          end
        end
        s = OpenStruct.new(r)
        s.url ||= "/" + parent
        if s.url !~ /^http:\/\//
          s.url = site.base_url + s.url
        end 
        s.label ||= parent.to_s.split('-').each{|word| word.capitalize!}.join(' ')
        s
      end

    end
  end
end
