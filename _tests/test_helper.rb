require 'minitest/autorun'
require 'minitest/reporters' # requires the gem
require 'webmock/minitest'

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new # spec-like progress
