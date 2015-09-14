$LOAD_PATH << File.dirname(__FILE__)
require 'bad_text'
require 'searchisko'

Blinkr::Extensions::Pipeline.new do |config|
  extension Blinkr::Extensions::Links.new config
  extension Blinkr::Extensions::JavaScript.new config
  extension Blinkr::Extensions::Resources.new config
  #extension Blinkr::Extensions::ImgAlt.new config
  #extension Blinkr::Extensions::ATitle.new config
  #extension Blinkr::Extensions::InlineCss.new config
  #extension Blinkr::Extensions::EmptyAHref.new config
  #extension Blinkr::Extensions::Meta.new config
  extension JBoss::Developer::Blinkr::BadText.new config
  extension JBoss::Developer::Blinkr::Searchisko.new config
end

