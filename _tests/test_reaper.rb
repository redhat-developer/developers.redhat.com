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

  #containers = Docker::Container.all(all: true)
  #to_kill = containers.select{|x| x.info["Labels"]["com.docker.compose.project"]=="rhdpr655"}
  #to_kill.each{|x| x.kill}
  #to_kill.each{|x| x.remove}

  def test_reap_of_existing
    prs = [1,2,3]
    containers = prs.map{|pr| MyFakeContainer.new(pr)}
    Docker::Container.stubs(:all).returns containers

    pulls = Reaper.kill_and_remove_prs(prs)


    assert_equal(['id1', 'id2', 'id3'], pulls)
    assert(containers.all?{|x| x.removed})
    assert(containers.all?{|x| x.killed})
  end

  def test_does_not_remove_if_not_needed
    prs = [1,2,3]
    containers = prs.map{|pr| MyFakeContainer.new(pr)}
    Docker::Container.stubs(:all).returns containers

    pulls = Reaper.kill_and_remove_prs([6.7,8])

    assert_equal([], pulls)
    assert(containers.none?{|x| x.removed})
    assert(containers.none?{|x| x.killed})
  end

  def test_only_kills_what_its_supposed_to
    prs = [1,2,3]
    containers = [MyFakeContainer.new('77')].concat prs.map{|pr| MyFakeContainer.new(pr)}
    containers.push(MyFakeContainer.new(99))
    Docker::Container.stubs(:all).returns containers

    pulls = Reaper.kill_and_remove_prs(prs)

    assert_equal(['id1', 'id2', 'id3'], pulls)
    assert_equal([false, true, true, true, false], containers.map{|x| x.removed})
    assert_equal([false, true, true, true, false], containers.map{|x| x.killed})
  end
end
