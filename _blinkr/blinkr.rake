require 'fileutils'
require 'json'

task :get_result do
  file = File.read("#{File.dirname(__FILE__)}/reports/blinkr_errors.json")
  blinkr_errors = JSON.parse(file)
  if blinkr_errors['pages'][0]['errors'].size > 0
    exit(1)
  else
    exit(0)
  end
end
