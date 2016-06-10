require 'delegate'
require_relative '../control'

class SystemCallWrapper < SystemCalls

  def initialize(network)
    @network = network
  end

  def execute_docker_compose(environment, cmd, args = [])
    @network.delete!
  end
end