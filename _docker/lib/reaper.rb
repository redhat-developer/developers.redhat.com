require 'docker'

class Reaper

  def self.killprs(prs_to_reap)
    containers = Docker::Container.all
    to_kill = extract_prs(containers, prs_to_reap)
    ids = to_kill.map{|c| c.id}

    puts "Going to kill and remove #{ids.join(',')}"

    to_kill.each{|c| c.kill; c.remove}

    puts "killed and removed #{ids.join(',')}"

    ids
  end

  def self.extract_prs(containers, prs_to_reap)
    prs_to_reap.flat_map do |pr|
      containers.select{|c| c.info["Labels"]["com.docker.compose.project"]=="rhdpr#{pr}"}
    end
  end

  private_class_method :extract_prs

end
