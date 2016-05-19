require 'minitest/autorun'
require 'minitest/reporters' # requires the gem
require 'mocha/mini_test'

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new # spec-like progress
