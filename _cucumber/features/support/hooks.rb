Before do
  @driver = Capybara.current_session.driver
  @page = App.new(@driver)
  @driver.browser.manage.window.maximize unless Capybara.current_driver == :mechanize
  visit('/')
end

Before('@mobile') do
  resize_window_to_mobile
end

After('@mobile') do
  resize_window_default
end

Before('@products, @downloads') do
  @product_ids = get_products[0]
  @product_names = get_products[1]
  @products_with_learn_link = get_products_with_links('learn.html.slim')[0]
  @products_with_docs = get_products_with_links('docs-and-apis.adoc')[0]
  @products_with_downloads = get_products_with_links('download.adoc')[0]
  @products_with_buzz = get_products_with_links('buzz.html.slim')[0]
end

Before('@accepted_terms') do
  data = SiteUser::ACCOUNT[:accepted_terms]
  @email_address = data[:email]
  @password = data[:password]
end

Before('@password_reset') do
  data = SiteUser::ACCOUNT[:password_reset]
  @email_address = data[:email]
  @password = data[:password]
end

Before('@site_user') do
  @site_user = generate_user
end

After('@logout') do
  # Temporary hack until selenium issue: Permission denied to access property "__raven__" (Selenium::WebDriver::Error::UnknownError) is removed.
  begin
    Home.new(@driver).physical_logout
  rescue
    Home.new(@driver).physical_logout
  end
end

After do |scenario|
  if scenario.failed?
    puts "The test failed on page: #{page.title}"
    Capybara.using_session(Capybara::Screenshot.final_session_name) do
      filename_prefix = Capybara::Screenshot.filename_prefix_for(:cucumber, scenario)

      saver = Capybara::Screenshot::Saver.new(Capybara, Capybara.page, true, filename_prefix)
      saver.save
      saver.output_screenshot_path

      if File.exist?(saver.screenshot_path)
        require 'base64'
        image = open(saver.screenshot_path, 'rb') { |io| io.read }
        encoded_img = Base64.encode64(image)
        embed(encoded_img, 'image/png;base64', "Screenshot of the error")
      end
    end
  end
end

def resize_window_to_mobile
  resize_window_by(360, 640)
end

def resize_window_to_tablet
  resize_window_by(768, 1024)
end

def resize_window_default
  resize_window_by(1400, 1000)
end

def resize_window_by(width, height)
  @driver.browser.manage.window.resize_to(width, height)
end
