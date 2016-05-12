require 'minitest/autorun'
require_relative '../control'

class TestControl < Minitest::Test

  def test_returns_true_when_supporting_service_in_list
    supporting_services = %w"drupal mysql searchisko drupalmysql"
    assert_equal(true, check_supported_service_requested(supporting_services, 'drupal'))
  end

  def test_returns_false_when_supporting_service_not_in_list
    supporting_services = %w"mysql searchisko"
    assert_equal(false, check_supported_service_requested(supporting_services, 'drupal'))
  end

  def test_returns_false_when_supporting_service_list_is_empty
    assert_equal(false, check_supported_service_requested([], 'drupal'))
  end

  def test_returns_false_when_supporint_service_list_is_nil
    assert_equal(false, check_supported_service_requested(nil, 'drupal'))
  end

end