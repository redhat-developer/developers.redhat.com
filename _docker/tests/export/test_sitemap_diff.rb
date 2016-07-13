require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/export/sitemap_diff'

class TestSitemapDiff < MiniTest::Test

  def build_mock_for_sitemap_request_to(sitemap_url, desired_sitemap_file_to_return)

    sitemap_contents = mock()
    sitemap_contents.expects(:code).returns(200)
    sitemap_contents.expects(:body).returns(File.open(File.expand_path(desired_sitemap_file_to_return,File.dirname(__FILE__))).read)
    sitemap_contents

  end


  def test_list_differences_between_sitemaps

      developers_redhat_sitemap = build_mock_for_sitemap_request_to('http://developers.redhat.com/sitemap.xml', 'diff-sitemap-1.xml')
      compared_sitemap = build_mock_for_sitemap_request_to('http://docker/sitemap.xml', 'diff-sitemap-2.xml')

      Net::HTTP.expects(:get_response).twice.returns(developers_redhat_sitemap).then.returns(compared_sitemap)

      expected_output = <<EOD
=== The following pages are in the sitemap of http://developers.redhat.com/sitemap.xml but not in the sitemap at http://docker/sitemap.xml: ===
- /articles/no-cost-rhel-faq
=== The following pages are in the sitemap at 'http://docker/sitemap.xml' but not in the http://developers.redhat.com/sitemap.xml sitemap: ===
- /foobar
EOD

      sitemap_diff = SitemapDiff.new

      assert_output(expected_output) {
        sitemap_diff.compare_existing_sitemap_to('http://docker/sitemap.xml')
      }
  end

  private :build_mock_for_sitemap_request_to
end