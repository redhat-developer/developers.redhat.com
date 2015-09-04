require 'cucumber'
require 'cucumber/rake/task'

task default: :features

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "_smoke_tests -r _smoke_tests/features/ --format pretty"
end
