# Red Hat Developers Acceptance Tests

This document assumes that the developer has previously followed the environment setup including docker. It will provide a developer with the instructions needed to setup and run the front end automated acceptance tests. 


## Quick Start - Running Acceptance Tests (slow)
This section explains how a developer can run the front-end Acceptance Tests.

To run the acceptance tests against the locally running Drupal site export, ensure the Drupal Docker container is running and the site has been exported.

Local machine (outside of docker):
      
      ruby _cucumber/run_tests.rb --host-to-test=dev
      
Using docker-selenium image:      
      
      ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev
 
To run the acceptance tests against the remote host:

      ruby _cucumber/run_tests.rb --host-to-test=https:foo.example.com 
      ruby _cucumber/run_tests.rb --use-docker --host-to-test=https:foo.example.com 

_NOTE:_ - Never run the acceptance tests against production.
This can interfere with site stats! 
We have a set of smoke tests that can be ran against production, for a quick sanity check of the site.
Smoke tests can be executed by running the following: 

    ruby _cucumber/run_tests.rb --host-to-test=production --cucumber-tags=@smoke 


### Getting Started
Automated tests are written in Ruby, and utilize cucumber and  watir to develop and execute automated front-end tests.

### Cucumber
[Cucumber](https://cucumber.io/) was introduced in order to bridge the gap of communication between developers and Business/ Product representatives. The idea of this was to write scenarios related to a feature in plain English before development begins. 
In short cucumber consists of a set of plain English features and step definitions which are written in Ruby. 

#### Features:
Features contain a story and then a set of manageable ‘scenarios’ (Acceptance Criteria). Scenarios are written in plain text  using a Domain Specific language called Gherkin. These scenarios contain Steps in the form of Given-When-Then-And-But, for example:

    Given - pre-condition 
    When - action 
    Then - outcome/assertion

The following are perfectly fine to use, however I try to use sparingly in features as I feel they get abused (more on this later).

    And – could be used as a second precondition, an action, or in some cases a second outcome/assertion.
    But – could be used as a second precondition, an action, or in some cases a second outcome/assertion.


#### Do’s and don't's when writing features:

Good example:
    
    Scenario: Basic personal registration
     Given a potential customer is on the registration page
     When the customer completes the registration form 
     Then a "Registration successful" message should appear

Bad example:
    
    Scenario: Basic personal registration
     Given a potential customer is on site
     When they click on the "Registration" link
     Then they should be on the "Registration" page
     When I fill in the "first name" field with "Joe" 
     And I fill in the "surname" field with "Blogs"    
     And I select "Mr" from the title dropdown
     And I fill in the "address line one" field with "Test Address line one"
     And I fill in the "address line two" field with "Test Address line two"
     And I fill in the "postcode" field with "NE TE5T"
     And I fill in the "email" field with "joe.blogs@example.com"
     When I click on the "Register" link
     Then "Registration successful" message should appear

Which of the above do you think looks more readable? Try to keep scenarios short by hiding implementation details.
Every .feature files can be found under _cucumber/features directory. 

The official cucumber [documentation](https://github.com/cucumber/cucumber/wiki/Feature-Introduction) has more detailed information on writing features.


#### Step Definitions:
Step definitions are defined in ruby files under features/step_definitions/*_steps.rb. Step definitions are the code behind the features that is used to automate a set of features and user stories.
For a more detailed introduction to step definitions I recommend reading the official [documentation](https://github.com/cucumber/cucumber/wiki/Step-Definitions)

### Watir
[Watir](http://watir.github.io/) (Web Application Testing in Ruby) is a free and open source library for automated testing web applications in web browsers. Watir interacts with a browser the same way people do: clicking links, filling out forms and validating text.

#### Browser Elements
All HTML elements are supported by Watir. 

#### Text Fields
    t = @browser.text_field id: 'entry_1000000'
    t.present?
    t.set 'your name'
    t.value

#### Select Lists – Combos
    s = @browser.select_list id: 'entry_1000001'
    s.select 'Ruby'
    s.selected_options

#### Radios
    r = @browser.radio value: 'A gem'
    r.present?
    r.set
    r.set?

#### Checkboxes
    c = @browser.checkbox value: '1.9.2'
    c.present?
    c.set
    c.set?

#### Buttons
    btn = @browser.button value: 'Submit'
    btn.present?
    btn.click

#### Links
    l = @browser.link text: 'Google Forms'
    l.present?
    l.click

#### Divs & Spans
    d = @browser.div class: 'ss-form-desc ss-no-ignore-whitespace'
    d.present?
    d.text


    s = @browser.span class: 'powered-by-text'
    s.present?
    S.text

#### Element
If you are attempting to locate an HTML element using the above and finding it difficult to find. Try using the ‘element’ locator. For example:
    s = @browser.element class: 'powered-by-text'
    s.present?
    s.text

#### Identify elements with AngularJS ng directives
Until recently it was difficult to test against angularJS ng directives. We now use a gem called watir-ng which works alongside watir and gives access to the following ng-directives.

    ng = @browser.element(ng_click: "goToPage('next'); scrollPosition();")
    ng.present?
    ng.text

#### Tip
			
Each available HTML element type can come in a singular and/or a plural form. For example:

    @browser.div
    @browser.divs

    @browser.link
    @Browser.links

The singular form (div) always returns one element.

The plural form (divs) returns all of the elements of the specified type that match the options provided to the call. 

#### For example:

    @browser.divs(class: 'result')
    
    
### Page Object Design Pattern

To increase maintainability the RHD Acceptance Test suite follows a Page Object Design Pattern. A page object is a class that serves as an interface to a page of the RHD website. The tests then use the methods of this page object class whenever they need to interact with the UI of that page. The benefit is that if the UI changes for the page, the tests themselves don’t need to change, only the code within the page object needs to change. Subsequently all changes to support that new UI are located in one place.

The project contains three abstract classes `generic_base_page.rb`, `site_base.rb`, and `standardised_search.rb`.  

#### Generic Base class 

The generic base page class is what everything else extends. It contains the instantiation code common to all pages, and the class methods needed to define elements and methods (more on these later).

#### Site Base 

This page class contains elements and methods that are common to all RHD pages. 

#### Page Classes

    require_relative 'abstract/site_base'
    
    # this is the page class that contains all elements and common methods related to the Login page
    class LoginPage < SiteBase
      page_url('/auth/realms/rhd/account/')
      expected_element(:text_field, id: 'username')
    
      element(:heading)                { |b| b.h1(text: 'Log In') }
      element(:username_field)         { |b| b.text_field(id: 'username') }
      element(:password_field)         { |b| b.text_field(id: 'password') }
      element(:kc_feedback)            { |b| b.element(id: 'kc-feedback') }
      element(:login_button)           { |b| b.button(id: 'kc-login') }
      element(:register_link)          { |b| b.link(text: 'Register') }
      element(:password_reset)         { |b| b.link(text: 'Forgot Password?') }
      element(:login_with_github)      { |b| b.link(id: 'social-github') }
    
      value(:error_message)            { |p| p.kc_feedback.text }
    
      action(:click_login_button)      { |p| p.login_button.click }
      action(:click_register_link)     { |b| b.register_link.click }
      action(:click_password_reset)    { |b| b.password_reset.click }
      action(:click_login_with_github) { |b| b.login_with_github.click }
    
      
      def login_with(username, password)
        type(username_field, username)
        type(password_field, password)
        click_login_button
      end
    
    end
    
First of all we name our page class, naming it by the page name of your application under test.

The Login page extends (inherits) the Site Base class as explained above. Here we can see we define a page_url and expected_element, which are used to instantiate the page.

Next we define an element (or elements) by passing in a block of watir code for it, and a value by referencing the element we defined before it. 
Since these element and value methods execute blocks against self, and the class delegates missing methods to our browser, we can refer to either the browser (shown as b) or the page class (shown as p) in our blocks.

#### Calling the page objects from Cucumber step definitions

    Given(/^I have previously logged in$/) do
      visit LoginPage do |page|
      page.login_with(@site_user.details[:email], @site_user.details[:password])
      expect(page.logged_in?).to eq(@site_user.details[:full_name])
      end
    end
    
The `visit` and `on` methods are defined in a page-helper module that is mixed into the Cucumber World so these available on all step definitions. As named, the `visit` method instantiates and navigates to the page, whereas the `on` just instantiates it.

    # this module contains 'visit' and 'on' methods that were created as a maintainable way of initialising/navigating to pages. (lib/pages)
    module PageHelper
      attr_accessor :current_page
    
      def visit(page_class, &block)
        on(page_class, true, &block)
      end
    
      def on(page_class, visit=false, &block)
        page = page_class.new(@browser, visit)
        block.call page if block
        @current_page = page
      end
    end

When a page has been instantiated by either `visit` or `on` you can then access the page that has been instantiated's elements and methods by using the 
`@current_page` instance variable. For example:
    
    Then(/^I should see a primary nav bar with the following tabs:$/) do |table|
       table.raw.each do |row|
       menu_item = row.first
       expect(@current_page.menu_item_present?(menu_item.downcase)).to be true
       end
    end
    
### Helper modules

Data-driven test helpers are available within the `_cucumber/lib/helpers/rest` directory.

This directory contains module helpers for download manager, keycloak and it services backend REST API's.

These helpes are used to get download data, create and manipulate site users.

### Stubbed Data

Quite often in our staging environment the DCP is down. To avoid unnecessary failures on pull-requests we decided the stub out the DCP.

For this we use a gem called [puffing-billy](https://github.com/oesmith/puffing-billy).

Tests that are stubbed are tagged with an @stubbed cucumber tag.

Whenever a scenario is tagged with @stubbed it will switch to phantomjs driver, and any calls to dcp will be stubbbed with locally stored fixtures.
Local fixtures can be found within `_cucumber/lib/fixtures/req_cache/feature_name/`.

### Cucumber profiles

It is possible to execute our tests using different profiles. The three main profiles are desktop, mobile, and kc_dm.

Profiles are defined within a cucumber.yml file, which is located within `_cucumber/cucumber.yml`

By default the tests are executed using the desktop profile and Chrome browser.

#### Mobile view

If you wish to execute the mobile profile tests:

    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=mobile --driver=iphone_6 
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=mobile --driver=iphone_6 

#### KC DM profile

Login, Register, and Download tests can be executed using the following profile:

    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=kc_dm 
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=kc_dm 
    
### Switching Browser or device

By default the tests are executed using the Chrome browser, however it is possible to switch drivers.

#### Firefox
   
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --driverr=firefox 
    
#### Mobile drivers (using chrome dev tools)
    
It is possible to test on any mobile device that is available within the chrome dev tools. You can find the available devices within:
    `_cucumber/driver/device config/chromium_devices.json`
    
Example:

    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=mobile --driver=nexus_6
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=mobile --driver=nexus_6

    
#### Browserstack 

    TODO: We need to add browserstack configuration to the acceptance test
     
 #### Cucumber tags
   
 Cucumber Tags are used to organise features and scenarios. Consider this example:  
  
    @logout @kc
    Scenario: A customer whom has the correct login credentials can log in using their username
      Given I am a RHD registered site visitor
      And I am on the Login page
      When I log in with a valid username
      Then I should be logged in
      
 As you can see this particular scenario is tagged with `@logout` and `@kc`. 
 
 Hooks can be used to set pre or post conditions for scenarios. For example `@logout` is used as a hook to logout after each scenario that contains this tag. 
 
 Hooks are usually defined within `_cucumber/features/support/hooks.rb`
    
    After('@logout') do
      case $host_to_test
        when 'https://developers.redhat.com', 'https://developers.redhat.com'
          @browser.goto('https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
        else
          @browser.goto('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
      end
    end
 
 
 The above scenario is also tagged with `@kc` tag which in this case is ised in the cucumber.yml file
      
  
    
    
       
    
