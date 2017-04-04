require_relative '../lib/drupal-data/lite/drupal_data_lite_image_builder'
require_relative '../lib/process_runner'

working_dir = File.expand_path(File.dirname(__FILE__))
image_builder = DrupalDataLiteImageBuilder.new(working_dir, ProcessRunner.new)
image_builder.generate_lite_data_image