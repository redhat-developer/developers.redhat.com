Before do
  @driver = Capybara.current_session.driver
  @site = App.new(@driver)
  case ENV['DRIVER']
    when 'firefox' || 'chrome'
      @driver.browser.manage.delete_all_cookies
    else
      @driver.clear_cookies
  end
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
        image = open(saver.screenshot_path, 'rb') {|io|io.read}
        encoded_img = Base64.encode64(image)
        embed(encoded_img, 'image/png;base64', "Screenshot of the error")
      end
    end
  end
end
