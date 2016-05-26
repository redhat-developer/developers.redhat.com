# Gemfile
source "http://rubygems.org"
#source "http://rubygems.org" # Try this without ssl for now

# Platform helpers
def windows_only(require_as)
  RbConfig::CONFIG['host_os'] =~ /mingw|mswin/i ? require_as : false
end

def linux_only(require_as)
  RbConfig::CONFIG['host_os'] =~ /linux/ ? require_as : false
end

def darwin_only(require_as)
  RbConfig::CONFIG['host_os'] =~ /darwin/ ? require_as : false
end

# GEMS
#gem 'awestruct', '0.5.7'
gem 'awestruct', git: 'https://github.com/lightguard/awestruct', branch: 'feature/perf-testing-large-site'
#gem 'awestruct', path: '~/projects/ruby/awestruct'
gem 'slim', '~> 3.0'
gem 'kramdown', '~> 1.0.1'
gem 'asciidoctor', '~> 1.5.0'
gem 'uglifier', '~> 2.0.1'
gem 'htmlcompressor', '~> 0.0.6'
gem 'curb', '~> 0.8.5'
gem 'oauth', '~> 0.3.6'
gem 'git', '~> 1.2.5'
gem 'oily_png', '~> 1.1.1'
gem 'nokogiri', '~> 1.5.10'
gem 'therubyracer', platforms: :ruby, require: linux_only('therubyracer')
gem 'parallel', '~> 1.1'
gem 'mime-types', '2.1'
gem 'google-api-client', '~> 0.8'
gem 'signet', '~> 0.6'
gem 'gpgme', '~> 2.0'
gem 'ruby-duration', '~> 3.1'
gem 'daybreak'
gem 'sass', '~> 3.4', '< 3.4.6'
gem 'activesupport', '> 3.1', '< 4.2.0' # Used in aweplug by ruby-duration
gem 'compass', '~> 1.0'
gem 'rake', '~>10.4'
gem "octokit", "~> 4.0"
gem 'docker-api', :require => 'docker'
gem 'uuid'

# To use Aweplug code from a different location:
#
# From a specific GitHub branch. Ommit the 'branch' parameter for 'master'
#    gem 'aweplug', github: '<github_id>/aweplug', :branch => '<branch_name>'
#
# From a location on your disk:
#
gem 'aweplug', git: 'https://github.com/awestruct/aweplug'

group :test do
  gem 'climate_control'
  gem 'guard'
  gem 'guard-minitest'
  gem 'launchy', '~>2.4'
  gem 'rubocop', '~> 0.34.2'
  gem 'cucumber', '~>2.0'
  gem 'minitest-reporters'
  gem 'rspec', '~>3.3'
  gem 'selenium-webdriver', '>= 2.53'
  gem 'parallel_tests', '~> 1.9.0'
  gem 'cuke_sniffer', '~> 0.0.8'
  gem 'require_all', '~> 1.3.2'
  gem 'chromedriver-helper', '0.0.6'
  gem 'site_prism', '~> 2.7'
  gem 'mocha'
  gem 'gmail', '~> 0.6.0'
  gem 'faker', '~> 1.6', '>= 1.6.1'
  gem 'report_builder', '~> 0.1.2'
  gem 'webmock', '~> 2.0'
end

group :development do
  gem 'rb-inotify', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-fchange', require: false
  gem 'pry', require: false
  gem 'pry-byebug', require: false
end

group :vdiff do
  gem 'wraith', '~> 1.3.0'
end

group :health do
  gem 'blinkr', '~> 0.3'
end
