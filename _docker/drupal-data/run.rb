require_relative '../lib/drupal-data/drupal_data_image_builder'
require_relative '../lib/process_runner'

if $0 == __FILE__
    image_version = ARGV[0]
    raise StandardError.new('Please specify an image version as the first argument to this script') if image_version.nil? or image_version.empty?

    drupal_data_image_builder = DrupalDataImageBuilder.new(File.expand_path(File.dirname(__FILE__)), ProcessRunner.new)
    drupal_data_image_builder.build_and_push_docker_image(image_version)
end