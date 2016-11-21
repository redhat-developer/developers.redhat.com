require_relative '../process_runner'

#
# This class builds a Docker image from the latest backup in the directory. It then tags this image with the given image number
# before finally pushing the image to Docker Hub.
#
# @author rblake@redhat.com
#
class DrupalDataImageBuilder

  attr_accessor :repository_name

  def initialize(working_directory, process_runner)
    @working_directory = working_directory
    @process_runner = process_runner
    @repository_name = 'redhatdeveloper/drupal-data'
  end

  #
  # Verifies that we have both the database dump and the drupal filesystem before beginning the image build
  #
  def verify_required_data_files!
    unless File.exists?("#{@working_directory}/drupal-filesystem.tar.gz") && File.exists?("#{@working_directory}/drupal-db.sql.gz")
      raise StandardError.new("Cannot locate both 'drupal-filesystem.tar.gz' and 'drupal-db.sql.gz' in directory '#{@working_directory}'.")
    end
  end

  #
  # Executes the Backup process of the current Drupal environment by calling out to Docker Compose to run the pre-configured
  # container instance.
  #
  def generate_drupal_backup
    @process_runner.execute!("cd #{@working_directory} && docker-compose run --rm drupal_data_generator")
  end

  #
  # Builds the Docker image applying the :latest tag and also a specific tag version
  #
  def build_docker_image(image_version)
    @process_runner.execute!("cd #{@working_directory} && docker build -t #{repository_name}:latest -t #{repository_name}:#{image_version} .")
  end

  #
  # Pushes the image to docker hub, updating the latest pointer.
  #
  def push_image_to_docker_hub(image_version)
    @process_runner.execute!("docker push #{@repository_name}:latest")
    @process_runner.execute!("docker push #{@repository_name}:#{image_version}")
  end

  #
  # Ensure that we delete any created images after they have been pushed so that we do not fill-up the Docker engine storage
  #
  def clean_generated_images(image_version)
    @process_runner.execute!("docker rmi #{@repository_name}:latest #{@repository_name}:#{image_version}")
  end

  def build_and_push_docker_image(image_version)
    generate_drupal_backup
    verify_required_data_files!
    build_docker_image(image_version)
    push_image_to_docker_hub(image_version)
    clean_generated_images(image_version)
  end

  private :verify_required_data_files!, :push_image_to_docker_hub, :build_docker_image, :generate_drupal_backup, :clean_generated_images

end