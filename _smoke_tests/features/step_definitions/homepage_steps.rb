Given /^I am on the home page$/ do
  visit('/')
end

Then(/^I should see the main titles$/) do
  expect(page).to have_content 'SOLUTIONS'
  expect(page).to have_content 'PRODUCTS'
  expect(page).to have_content 'DOWNLOADS'
  expect(page).to have_content 'COMMUNITY'
  expect(page).to have_content 'EVENTS'
  expect(page).to have_content 'BLOGS'
end

Given(/^I am on the products page$/) do
  visit('/products')
end

Then(/^I should see all the product sections$/) do
  find(:xpath, '//*[@id="infrastructure_management"]/h5').text.include?("INFRASTRUCTURE MANAGEMENT")
  find(:xpath, '//*[@id="cloud_products"]/h5').text.include?("CLOUD PRODUCTS")
  find(:xpath, '//*[@id="jboss_development_and_management"]/h5').text.include?("BOSS DEVELOPMENT AND MANAGEMENT")
  find(:xpath, '//*[@id="integration_and_automation"]/h5').text.include?("INTEGRATION AND AUTOMATION")
end

Then(/^I should see "([^"]*)" products$/) do |products|
  page.assert_selector('.development-tool', :count => products.to_i)
end

Then(/^I should see "([^"]*)" products with a learn link$/) do |learn_links|
  page.assert_selector('.fa-files-o', :count => learn_links.to_i)
end

