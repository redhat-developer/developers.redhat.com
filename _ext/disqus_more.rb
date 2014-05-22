module Awestruct
  module Extensions
    class Disqus
      module Disqus
        def disqus_popular_posts(num_items = 5, title = 'Popular Posts', heading_level = 'h2')
          %Q{
            <div id="#{title.downcase.gsub(' ', '')}" class="dsq-widget">
              <#{heading_level} class="dsq-widget-title">#{title}</#{heading_level}>
              <script src="http://#{site.disqus}.disqus.com/popular_threads_widget.js?num_items=#{num_items}"></script>
              <script>
                var ppw = document.getElementById("#{title.downcase.gsub(' ', '')}");
                if (ppw.getElementsByTagName('li').length == 0) {
                  var p = document.createElement('p');
                  p.className = 'noresults';
                  p.appendChild(document.createTextNode('No #{title.downcase} reported.')); 
                  ppw.appendChild(p);
                }
              </script>
              <noscript>
                <p>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">#{title.downcase} powered by Disqus</a>.</p>
              </noscript>
            </div>
          }
        end
      end
    end
  end
end
