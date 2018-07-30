require 'minitest/autorun'
require 'minitest/reporters' # requires the gem
require 'mocha/mini_test'
require 'webmock/minitest'

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new # spec-like progress
