module JBoss
  module Developer
    class CustomerPortal

      def execute site
        unless site.customer_portal_articles.nil?
          articles = []
          site.customer_portal_articles.each do |r, a| 
            url = a['url']
            articles << {'url' => "https://api.access.redhat.com/rs/articles#{url[url.rindex("/"), url.length]}", 'product' => a['target_product'] } unless url.nil?
          end
          File.open(Pathname.new(site.output_dir).join('rht_articles.json'), 'w') { |f| f.write( articles.to_json) }
        end
        unless site.customer_portal_solutions.nil?
          solutions = []
          site.customer_portal_solutions.each do |r, a| 
            url = a['url']
            solutions << {'url' => "https://api.access.redhat.com/rs/solutions#{url[url.rindex("/"), url.length]}", 'product' => a['target_product'] } unless url.nil?
          end
          File.open(Pathname.new(site.output_dir).join('rht_solutions.json'), 'w') { |f| f.write( solutions.to_json) }
        end
      end

    end
  end
end
