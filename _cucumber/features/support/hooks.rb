Before('@products') do
  @products_with_learn_link = products_with_links('learn.html.slim')[0]
  @products_with_docs = products_with_links('docs-and-apis.adoc')[0]
  @products_with_get_started = products_with_links('get-started.adoc')[0]
  @technologies_with_downloads = expected_downloads[0]
  @products_with_buzz = products_with_links('buzz.html.slim')[0]
  @products_with_help = products_with_links('help.html.slim')[0]
end

After do |scenario|
  if scenario.failed?
    Dir.mkdir("#{$cucumber_dir}/screenshots") unless Dir.exist?("#{$cucumber_dir}/screenshots")
    screenshot = "#{$cucumber_dir}/screenshots/#{ENV['RHD_TEST_PROFILE']}/FAILED_#{scenario.name.sub(' ', '_').sub(/[^0-9A-Za-z_]/, '')}.png"
    @browser.driver.save_screenshot(screenshot)
    embed screenshot, 'image/png'
  end
end
