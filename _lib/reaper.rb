require 'docker'

class Reaper

  def self.kill_and_remove_prs(prs_to_reap)
    containers = Docker::Container.all
    to_kill = find_pr_docker_containers(containers, prs_to_reap)
    ids = to_kill.map{|c| c.id}

    to_kill.each do |c|
      puts "Killing and removing container with id: '#{c.id}'"
      c.kill
      c.remove
    end

    prs_to_reap.each  do | pull_request |
      clean_pr_network(pull_request)
      clean_docker_images(pull_request)
    end

    ids
  end

  #
  # Cleans all docker images associated with the pull request. Assumes that images are named in the format
  # rhdpr#{pr}_
  #
  def self.clean_docker_images(pr)
    Kernel.system("docker rmi $(docker images --format \"{{.Repository}}\" rhdpr#{pr}*)")
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

  def self.find_pr_docker_containers(containers, prs_to_reap)
    prs_to_reap.flat_map do |pr|
      containers.select{|c| c.info["Labels"]["com.docker.compose.project"]=="rhdpr#{pr}"}
    end
  end

  private_class_method :find_pr_docker_containers, :clean_pr_network, :clean_docker_images

end