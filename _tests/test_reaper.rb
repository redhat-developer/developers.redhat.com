require 'mocha/mini_test'
require 'minitest/autorun'
require 'sawyer'
require 'climate_control'
require_relative '../_lib/reaper.rb'
require_relative 'test_helper.rb'

class TestOptions < Minitest::Test

  #Simple fake class
  class MyFakeContainer
    attr_reader :id, :removed, :killed, :info
    def initialize(pr)
      @pr = pr
      @id = "id#{@pr}"
      @info = {"Labels" => {"com.docker.compose.project" => "rhdpr#{pr}"}}
      @killed = false
      @removed = false
    end

    def kill
      @killed = true
    end

    def remove
      @removed = true
    end
  end

  # Fake class for Docker::Network instance
  class MyFakeNetwork
    attr_reader :deleted, :pr
    def initialize(pr)
      @pr = pr
      @deleted = false
    end  

    def delete
      @deleted = true
    end
  end


  def test_reap_of_existing
    prs = [1,2,3]
    containers = prs.map{|pr| MyFakeContainer.new(pr)}
    networks = prs.map{|pr| MyFakeNetwork.new(pr)}
    
    Docker::Container.stubs(:all).returns containers
    Docker::Network.stubs(:get).with("rhdpr1_default").returns networks[0]
    Docker::Network.stubs(:get).with("rhdpr2_default").returns networks[1]
    Docker::Network.stubs(:get).with("rhdpr3_default").returns networks[2]

    pulls = Reaper.kill_and_remove_prs(prs)

    assert_equal(['id1', 'id2', 'id3'], pulls)
    assert(containers.all?{|x| x.removed})
    assert(containers.all?{|x| x.killed})
    assert(networks.all?{|n| n.deleted})
  end

  def test_does_not_remove_if_not_needed
    prs = [1,2,3]
    containers = prs.map{|pr| MyFakeContainer.new(pr)}
    networks = [MyFakeNetwork.new(6.7), MyFakeNetwork.new(8)]
    
    Docker::Container.stubs(:all).returns containers
    Docker::Network.stubs(:get).with("rhdpr6.7_default").returns networks[0]
    Docker::Network.stubs(:get).with("rhdpr8_default").returns networks[1]
    
    pulls = Reaper.kill_and_remove_prs([6.7,8])

    assert_equal([], pulls)
    assert(containers.none?{|x| x.removed})
    assert(containers.none?{|x| x.killed})
    assert(networks.all?{|n| n.deleted})
  end

  def test_only_kills_what_its_supposed_to
    prs = [1,2,3]
    containers = [MyFakeContainer.new('77')].concat prs.map{|pr| MyFakeContainer.new(pr)}
    containers.push(MyFakeContainer.new(99))

    networks = prs.map{|pr| MyFakeNetwork.new(pr)}

    Docker::Container.stubs(:all).returns containers
    Docker::Network.stubs(:get).with("rhdpr1_default").returns networks[0]
    Docker::Network.stubs(:get).with("rhdpr2_default").returns networks[1]
    Docker::Network.stubs(:get).with("rhdpr3_default").returns networks[2]

    pulls = Reaper.kill_and_remove_prs(prs)

    assert_equal(['id1', 'id2', 'id3'], pulls)
    assert_equal([false, true, true, true, false], containers.map{|x| x.removed})
    assert_equal([false, true, true, true, false], containers.map{|x| x.killed})
    assert(networks.all?{|n| n.deleted})
  end
end
