Given(/^I am on the ([^"]*) page$/) do |page|
  case page.downcase
    when 'community'
      visit('/projects')
    when 'downloads'
      visit('/downloads')
    when 'resources'
      visit('/resources/#!')
    when 'eap landing'
      visit('/products/eap/overview/')
    when 'eap learn'
      visit('/products/eap/learn')
    when 'home'
      visit('/')
    when 'products'
      visit('/products')
    when 'solutions'
      visit('/solutions')
    when 'events'
      visit('/events')
    else
      raise "#{page} was not recognised, please add it to the navigation step definition at step_definitions/common/navigation_steps.rb"
  end
end
