require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/drupal/drupal-filesystem/scripts/phinx'
require_relative '../test_helper'

class TestPhinx < Minitest::Test

  def setup
    clear_environment
  end

  def teardown
    clear_environment
  end

  def clear_environment
    ENV['PHINX_DB_HOST'] = nil
    ENV['PHINX_DB_NAME'] = nil
    ENV['PHINX_DB_USER'] = nil
    ENV['PHINX_DB_PASSWORD'] = nil
  end

  def test_should_bind_and_execute_phinx_command

    Kernel.expects(:system).with('phinx migrate -e automated').returns(true)
    Kernel.expects(:exit).with(0)
    phinx = Phinx.new
    phinx.drupal_config_file = "#{__dir__}/test.rhd.settings.yml"
    phinx.run_phinx_command('migrate')

    assert_equal('foo', ENV['PHINX_DB_HOST'])
    assert_equal('bar', ENV['PHINX_DB_NAME'])
    assert_equal('baz', ENV['PHINX_DB_USER'])
    assert_equal('bin', ENV['PHINX_DB_PASSWORD'])
  end

  def test_should_bind_and_execute_phinx_command_that_fails
    Kernel.expects(:system).with('phinx migrate -e automated').returns(false)
    Kernel.expects(:exit).with(1)
    phinx = Phinx.new
    phinx.drupal_config_file = "#{__dir__}/test.rhd.settings.yml"
    phinx.run_phinx_command('migrate')

    assert_equal('foo', ENV['PHINX_DB_HOST'])
    assert_equal('bar', ENV['PHINX_DB_NAME'])
    assert_equal('baz', ENV['PHINX_DB_USER'])
    assert_equal('bin', ENV['PHINX_DB_PASSWORD'])
  end

  def test_should_bind_and_execute_command_that_returns_nil
    Kernel.expects(:system).with('phinx migrate -e automated').returns(nil)
    Kernel.expects(:exit).with(1)
    phinx = Phinx.new
    phinx.drupal_config_file = "#{__dir__}/test.rhd.settings.yml"
    phinx.run_phinx_command('migrate')

    assert_equal('foo', ENV['PHINX_DB_HOST'])
    assert_equal('bar', ENV['PHINX_DB_NAME'])
    assert_equal('baz', ENV['PHINX_DB_USER'])
    assert_equal('bin', ENV['PHINX_DB_PASSWORD'])
  end

end