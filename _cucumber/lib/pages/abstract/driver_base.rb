class DriverBase

  def initialize(driver, visit = false)
    @driver = driver
    goto if visit
    has_expected_title? if respond_to? :has_expected_title?
  end

  def self.page_url(url)
    define_method 'goto' do
      open(url)
    end
  end

  def open(url)
    if url.include?('realms')
      @driver.get($keycloak_base_url + url)
    else
      @driver.get($host_to_test + url)
    end
  end

  def self.page_title(expected_title)
    define_method 'has_expected_title?' do
      wait_for_ajax
      has_expected_title = expected_title.kind_of?(Regexp) ? expected_title =~ title : expected_title == title
      raise "Expected title '#{expected_title}' instead of '#{title}'" unless has_expected_title
    end
  end

  def method_missing(sym, *args, &block)
    @driver.send sym, *args, &block
  end

  def self.element(element_name)
    define_method element_name.to_s do
      yield self
    end
  end

  class << self
    alias :value :element
    alias :elements :element
    alias :action :element
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

  def type(locator, string)
    locator.clear
    locator.send_keys string
  end

  def press_return
    @driver.action.send_keys(:return).perform
  end

  def select(locator, option)
    option = locator.find_element(xpath: "//option[contains(text(), '#{option}')]")
    option.click
  end

  def default_dropdown_item(loctor)
    select_list = Selenium::WebDriver::Support::Select.new(loctor)
    select_list.selected_options[0].text
  end

  def dropdown_items(loctor)
    dropdown_items = []
    select_list = Selenium::WebDriver::Support::Select.new(loctor)
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
    result = @driver.find_elements(locator).size > 0
    if result
      result = @driver.find_element(locator).displayed?
    end
    result
  end

  def custom_displayed?(el, locator)
    el.find_element(locator).displayed?
    true
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def text_of(locator)
    wait_until_displayed(locator)
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

  def wait_until_displayed(seconds=6, locator)
    wait_for(seconds) { displayed?(locator) }
  end

  def wait_until_not_displayed(seconds=6, locator)
    wait_for(seconds) {
      !displayed?(locator)
    }
  end

  def wait_for_ajax(timeout = 30)
    end_time = ::Time.now + timeout
    until ::Time.now > end_time
      return if finished_all_ajax_requests?
      sleep 0.5
    end
    true
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
    all_windows.select { |this_window| this_window != first_window }
    @driver.close
    @driver.switch_to.window(first_window)
  end

  def close_and_reopen_browser
    @driver.execute_script("window.open()")
    @driver.close
    @driver.switch_to.window(@driver.window_handles.last)
  end

  private

  def finished_all_ajax_requests?
    @driver.execute_script("return window.jQuery != undefined && jQuery.active == 0")
  end

end
