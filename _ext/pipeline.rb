require 'load_xml'
require 'read_xml'

Awestruct::Extensions::Pipeline.new do
  # load up yaml files for downloads
  extension JBoss::Developer::Awestruct::Extensions::LoadXmlFiles.new('_downloads', 'downloads.xsd')
  extension JBoss::Developer::Awestruct::Extensions::LoadXmlFiles.new('_specs', 'specs.xsd')
  extension JBoss::Developer::Awestruct::Extensions::LoadXmlFiles.new('_projects', 'projects.xsd')
  extension JBoss::Developer::Awestruct::Extensions::LoadXmlFiles.new('_products', 'products.xsd')
  extension JBoss::Developer::Awestruct::Extensions::ReadXmlFiles.new('_developer-materials', 'developer_materials.xsd')
end

