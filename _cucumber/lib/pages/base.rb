class Base

  def initialize(driver)
    @driver = driver
  end

  def visit(url='/')
    @driver.get($host_to_test + url)
  end

  def get(url)
    @driver.get(url)
  end

  def find(locator)
    @driver.find_element(locator)
  end

  def custom_find(el, locator)
    el.find_element(locator)
  end

  def find_elements(locator)
    @driver.find_elements(locator)
  end

  def clear(locator)
    find(locator).clear
  end

  def type(locator, input)
    find(locator).clear
    find(locator).send_keys(input)
  end

  def press_return
    @driver.action.send_keys(:return).perform
  end

  def select(locator, option)
    select = find(locator)
    option = select.find_element(xpath: "//option[contains(text(), '#{option}')]")
    option.click
  end

  def default_dropdown_item(loctor)
    dropdown = find(loctor)
    select_list = Selenium::WebDriver::Support::Select.new(dropdown)
    select_list.selected_options[0].text
  end

  def dropdown_items(loctor)
    dropdown_items = []
    dropdown = find(loctor)
    select_list = Selenium::WebDriver::Support::Select.new(dropdown)
    select_list.options.each do |item|
      dropdown_items << item.text
    end
    dropdown_items
  end

  def click_on(locator)
    find(locator).click
  end

  def custom_click_on(el, locator)
    el.find_element(locator).click
  end

  def hover_on(locator)
    el = find(locator)
    @driver.action.move_to(el).perform
  end

  def displayed?(locator)
    @driver.find_element(locator).displayed?
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def custom_displayed?(el, locator)
    el.find_element(locator).displayed?
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def text_of(locator)
    find(locator).text
  end

  def body
    find(:tag_name => "body").text
  end

  def title
    @driver.title
  end

  def url
    @driver.current_url
  end

  def go_back
    @driver.navigate.back
  end

  def attribute(locator, type)
    element = find(locator)
    element.attribute(type)
  end

  def wait_for(seconds=6)
    Selenium::WebDriver::Wait.new(:timeout => seconds).until { yield }
  end

  def verify_page(page_title)
    wait_for_ajax
    raise("Expected page title to include #{page_title} but was #{title}") unless title.include?(page_title)
  end

  def wait_for_ajax(timeout = 60, message = nil)
    end_time = ::Time.now + timeout
    until ::Time.now > end_time
      return if finished_all_ajax_requests?
      sleep 0.5
    end
    message = "Timed out after #{timeout} waiting for ajax requests to complete" unless message
    raise(message)
  end

  def current_window
    @driver.window_handle
  end

  def get_windows
    @driver.window_handles
    @driver.window_handles.map do |w|
      @driver.switch_to.window(w)
      [w, @driver.title]
    end
  end

  def wait_for_windows(size)
    wait_for(10) { get_windows.size == size }
  end

  def switch_window(first_window)
    all_windows = @driver.window_handles
    new_window = all_windows.select { |this_window| this_window != first_window }
    @driver.close

    @driver.switch_to.window(first_window)

  end

  private

  def finished_all_ajax_requests?
    @driver.execute_script("return window.jQuery != undefined && jQuery.active == 0")
  end

end
