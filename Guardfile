# A sample Guardfile
# More info at https://github.com/guard/guard#readme

#TODO This should be possible, but it only watches the first directory in the list
#It would be worth submitting this as a bug to minitest guard
#directories %w(_docker ./_lib _tests) \
  #.select{|d| Dir.exists?(d) ? d : UI.warning("Directory #{d} does not exist")}

guard :minitest, test_folders: ['_docker/test', '_tests'] do
  # Docker folder with Minitest::Unit
  watch(%r{^_docker/test/(.*)\/?test_(.*)\.rb$})
  watch(%r{^_docker/lib/(.*/)?([^/]+)\.rb$})     { |m| "_docker/test/#{m[1]}test_#{m[2]}.rb" }
  watch(%r{^_docker/test/test_helper\.rb$})      { 'test' }

  # Top level folder with Minitest::Unit
  watch(%r{^_tests/(.*)\/?test_(.*)\.rb$})
  watch(%r{^_lib/(.*/)?([^/]+)\.rb$})     { |m| "_tests/#{m[1]}test_#{m[2]}.rb" }
  watch(%r{^_tests/test_helper\.rb$})      { 'test' }
end
