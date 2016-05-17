# Fake class for Docker::Network instance
class MyFakeNetwork
  attr_reader :pr
  def initialize(pr)
    @pr = pr
    @deleted = false
  end

  def deleted?
    @deleted
  end

  def delete!
    @deleted = true
  end
end