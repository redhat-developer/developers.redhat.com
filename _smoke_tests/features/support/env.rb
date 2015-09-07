require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'

Capybara.javascript_driver = :poltergeist

Capybara.configure do |config|
  #TODO these need to be configured externally
  #config.app_host   = 'https://developers.redhat.com/'
  config.app_host   = 'http://docker:32768'
end

Capybara.register_driver :poltergeist do |app|
  #The ssl options below allow us to call searchisko (operating from a different host
    Capybara::Poltergeist::Driver.new(app, {
    :phantomjs_options => ['--debug=no', '--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=TLSv1'], :js_errors => false })
end

#This timeout will allow the page to wait for XHR
Capybara.default_wait_time = 5
World(Capybara)
