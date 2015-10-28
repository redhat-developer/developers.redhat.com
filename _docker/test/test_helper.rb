require 'minitest/autorun'
require 'minitest/reporters' # requires the gem

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new # spec-like progress
