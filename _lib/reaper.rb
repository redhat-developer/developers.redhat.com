require 'docker'

class Reaper

  def self.kill_and_remove_prs(prs_to_reap)
    containers = Docker::Container.all
    to_kill = extract_prs(containers, prs_to_reap)
    ids = to_kill.map{|c| c.id}

    puts "Going to kill and remove containers with ids: #{ids.join(',')}"

    to_kill.each do |c|
      puts "Killing and removing container with id: '#{c.id}'"
      c.kill
      c.remove
    end

    clean_pr_networks(prs_to_reap)

    ids
  end

  #
  # Deletes the docker network associated with each of the given pull requests
  #
  def self.clean_pr_networks(prs_to_reap)
    prs_to_reap.each { |pr| clean_pr_network(pr) }
  end 

  #
  # Deletes the Docker network associated with the pull request. This assumes the network will be named "rhdpr{#pr}_default"
  # Ideally this should be done through docker-compose down, but that is a larger change to the build and this will work
  # and help prevent Docker from running out of networks
  #
  def self.clean_pr_network(pr)
    
    networkName="rhdpr#{pr}_default"
    puts "Deleting Docker network '#{networkName}' for pull request '#{pr}'"

    begin
      network = Docker::Network.get(networkName)
      network.delete()
      puts "Successfully deleted Docker network '#{networkName}' for pull request '#{pr}'"
    rescue Docker::Error::NotFoundError
      puts "Failed to delete Docker network '#{networkName}' for pull request '#{pr}' as it does not exist."
    end

  end

  def self.extract_prs(containers, prs_to_reap)
    prs_to_reap.flat_map do |pr|
      containers.select{|c| c.info["Labels"]["com.docker.compose.project"]=="rhdpr#{pr}"}
    end
  end

  private_class_method :extract_prs, :clean_pr_networks, :clean_pr_network

end
