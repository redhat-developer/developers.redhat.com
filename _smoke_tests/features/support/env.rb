require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'

Capybara.javascript_driver = :poltergeist

Capybara.configure do |config|
  host_to_test = ENV['HOST_TO_TEST'] ||= 'http://docker:32768'
  puts "Running smoke tests against #{host_to_test}."
  puts "To change this use the Environment varaiable HOST_TO_TEST"
  puts "E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080"
  config.app_host = host_to_test
end

Capybara.register_driver :poltergeist do |app|
  #The ssl options below allow us to call searchisko (operating from a different host
    Capybara::Poltergeist::Driver.new(app, {
    :phantomjs_options => ['--debug=no', '--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=TLSv1'], :js_errors => false })
end

#This timeout will allow the page to wait for XHR
Capybara.default_max_wait_time = 20
World(Capybara)
