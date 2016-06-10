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

  def select(locator, option)
    select = find(locator)
    option = select.find_element(xpath: "//option[contains(text(), '#{option}')]")
    option.click
  end

  def click_on(locator)
    find(locator).click
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


  private

  def finished_all_ajax_requests?
    @driver.execute_script("return window.jQuery != undefined && jQuery.active == 0")
  end

end
