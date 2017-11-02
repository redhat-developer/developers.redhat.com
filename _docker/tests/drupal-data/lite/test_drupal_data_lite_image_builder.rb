require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../lib/drupal-data/lite/drupal_data_lite_image_builder'
require_relative '../../test_helper'

class TestDrupalDataLiteImageBuilder < MiniTest::Test

 def setup
    @process_runner = mock()
    @drupal_data_image_builder = DrupalDataLiteImageBuilder.new('/tmp', @process_runner)
 end

 def test_should_correctly_build_image
    @process_runner.expects(:execute!).with('rm -rf /tmp/work')
    @process_runner.expects(:execute!).with('mkdir /tmp/work')
    @process_runner.expects(:execute!).with('docker pull redhatdeveloper/drupal-data:latest')
    @process_runner.expects(:execute!).with("docker run --rm -v /tmp/work:/work redhatdeveloper/drupal-data:latest /bin/sh -c \"zcat /docker-entrypoint-initdb.d/drupal-db.sql.gz | awk '!/INSERT INTO \\`node_revision__body\\`/' | awk '!/INSERT INTO \\`lightning_node_revision__body\\`/' | gzip > /work/drupal-db.sql.gz && chmod 777 /work/drupal-db.sql.gz\"")
    @process_runner.expects(:execute!).with('cd /tmp && docker run --rm -v /tmp/work:/work redhatdeveloper/drupal-data:latest /bin/sh -c "cp -R /var/www/drupal/web/config/active /work/config && chmod -R 777 /work/config"')
    @process_runner.expects(:execute!).with('cd /tmp && docker run --rm -v /tmp/work:/work redhatdeveloper/drupal-data:latest /bin/sh -c "cp -R /var/www/drupal/web/sites/default/files /work/files && chmod -R 777 /work/files"')
    @process_runner.expects(:execute!).with('cd /tmp && docker build -t redhatdeveloper/drupal-data-lite:latest -f Dockerfile.lite .')
    @process_runner.expects(:execute!).with('docker push redhatdeveloper/drupal-data-lite:latest')
    @process_runner.expects(:execute!).with('rm -rf /tmp/work')

    @drupal_data_image_builder.generate_lite_data_image
 end

end
