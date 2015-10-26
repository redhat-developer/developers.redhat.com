# A sample Guardfile
# More info at https://github.com/guard/guard#readme

#Add directories to be watched here.
directories %w(_docker) \
  .select{|d| Dir.exists?(d) ? d : UI.warning("Directory #{d} does not exist")}

guard :minitest, test_folders: '_docker/test' do

  # with Minitest::Unit
  watch(%r{^_docker/test/(.*)\/?test_(.*)\.rb$})
  watch(%r{^_docker/lib/(.*/)?([^/]+)\.rb$})     { |m| "_docker/test/#{m[1]}test_#{m[2]}.rb" }
  watch(%r{^_docker/test/test_helper\.rb$})      { 'test' }

end

