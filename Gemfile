# Gemfile
source "https://rubygems.org"

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
gem 'awestruct', '~> 0.5.6.beta8'
gem 'slim', '~> 2.0.0'
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
gem 'aweplug', github: 'awestruct/aweplug'
#gem 'aweplug', path: '~/projects/ruby/aweplug'
#gem 'aweplug', path: '../aweplug'
gem 'parallel', '~> 1.1.0'
gem 'mime-types', '2.1'
gem 'google-api-client', '~> 0.7'
gem 'signet', '~> 0.5.1'
gem 'gpgme', '~> 2.0'
gem 'ruby-duration', '~> 3.1'
gem 'daybreak'
gem 'sass', '~> 3.4', '< 3.4.6'
gem 'activesupport', '> 3.1', '< 4.2.0' # Used in aweplug by ruby-duration

group :development do
  gem 'rb-inotify', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-fchange', require: false
  gem 'rake', '~> 10.0.4'
  #gem 'pry', require: false
  #gem 'pry-byebug', require: false
  #gem 'pry-stack_explorer', require: false
  #gem 'pry-exception_explorer', require: false
end

group :vdiff do
  gem 'wraith', '~> 1.3.0'
end

group :health do
  gem 'blinkr', '~> 0.2.7'
  #gem 'blinkr', github: 'pmuir/blinkr'
  #gem 'blinkr', path: '../blinkr'
end

