Before do
  @driver = Capybara.current_session.driver
  @page = App.new(@driver)
  if Capybara.current_driver == 'poltergeist'.to_sym
    @driver.clear_cookies
  else
    @driver.browser.manage.delete_all_cookies
  end
  visit('/')
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
  data = Customer::ACCOUNT[:accepted_terms]
  @email_address = data[:email]
  @password = data[:password]
end

Before('@password_reset') do
  data = Customer::ACCOUNT[:password_reset]
  @email_address = data[:email]
  @password = data[:password]
end

Before('@customer') do
  @customer = generate_customer
end

After('@logout') do
  user_logout unless @redirect_url == '' || @redirect_url.nil?
  Home.new(@driver).physical_logout
end

After do |scenario|
  if scenario.failed?
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

def user_logout
  if Capybara.app_host == 'http://developers.redhat.com/'
    visit("https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=#{@redirect_url}%3Fredirect_fragment%3D!")
  else
    visit("https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?redirect_uri=#{@redirect_url}%3Fredirect_fragment%3D!")
  end
  Home.new(@driver).wait_for_ajax
  sleep(1)
end
