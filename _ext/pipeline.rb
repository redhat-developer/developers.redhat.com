require 'downloads'

Awestruct::Extensions::Pipeline.new do
  # load up yaml files for downloads
  extension JBoss::Developer::Awestruct::Extensions::LoadXmlFile.new('_downloads', 'downloads.xsd')
end

