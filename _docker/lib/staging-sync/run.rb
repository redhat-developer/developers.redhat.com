require_relative '../process_runner'
require_relative 'database_sync'

module RedhatDeveloper
  module StagingSync
    if $0 == __FILE__
      DatabaseSync.new('/backup','/docker-entrypoint-initdb.d/drupal-db.sql.gz', ProcessRunner.new).sync_database
    end
  end
end