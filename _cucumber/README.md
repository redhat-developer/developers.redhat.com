# Red Hat Developers Acceptance Tests

This document assumes that the developer has previously followed the environment setup including docker. It will provide a developer with the instructions needed to setup and run the frontend automated acceptance tests. 


## Quick Start - Running Acceptance Tests 
This section explains how a developer can run the front-end Acceptance Tests from their machine.

Acceptance tests can be ran locally against local browsers, or within docker using Chrome and Firefox browsers. It is now recommended that you execute tests within docker, unless debugging as it is easier to debug a local browser.

To run the acceptance tests against the locally running Drupal site export, ensure the Drupal Docker container is running and the site has been exported.

We recommend using docker to run automated test as all test dependancies (chrome/firefox/phantomjs) binaries are handled for you:

Using testing docker image:      
      
      ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev


Debugging when using docker:

To inspect visually what the browser is doing use the following:

Open vnc viewer:

       `open vnc://:secret@192.168.99.100:5900` 

If prompted for a VNC password, it is `secret`.

NOTE: to get port of the browser you wish to debug use `docker ps`

Local machine (outside of docker):

If you have the chrome/phantomjs binaries saved to your path you can run tests locally:      

    ruby _cucumber/run_tests.rb --host-to-test=dev
      
 To run the acceptance tests against a remote host:

      ruby _cucumber/run_tests.rb --use-docker --host-to-test=https:foo.example.com 
      ruby _cucumber/run_tests.rb --host-to-test=https:foo.example.com 
      
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
For a more detailed introduction to step definitions I recommend reading the official [documentation](https://github.com/cucumber/cucumber/wiki/Step-Definitions).

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
    
At the time of writing the following ng-directives are available:
 
    def directives
       %w(ng_jq ng_app ng_href ng_src ng_srcset ng_disabled ng_checked ng_readonly 
          ng_selected ng_open ng_form ng_value ng_bind ng_bind_template ng_bind_html 
          ng_change ng_class ng_class_odd ng_class_even ng_cloak ng_controller ng_csp 
          ng_click ng_dblclick ng_mousedown ng_mouseup ng_mouseover ng_mouseenter 
          ng_mouseleave ng_mousemove ng_keydown ng_keyup ng_keypress ng_submit ng_focus
          ng_blur ng_copy ng_cut ng_paste ng_if ng_include ng_init ng_list ng_model 
          ng_model_options ng_non_bindable ng_options ng_pluralize ng_repeat ng_show 
          ng_hide ng_style ng_switch ng_transclude).map(&:to_sym)
     end
     
You can also identify elements with custom directives by registering them before patching the browser:

    WatirNg.register(:ng_foo, :ng_bar).patch!

See [cucumber env file](https://github.com/redhat-developer/developers.redhat.com/blob/master/_cucumber/features/support/env.rb) for current custom ng-directives.

#### Elements
			
Each available HTML element type can come in a singular and/or a plural form. For example:

    @browser.div
    @browser.divs

    @browser.link
    @Browser.links

The singular form (div) always returns one element.

The plural form (divs) returns all of the elements of the specified type that match the options provided to the call. 

#### For example:

    @browser.divs(class: 'result')
    
#### Attributes 

It is possible to get element attributes, for example:

Returns value of the element.
     
     @browser.a(id: "link_2").attribute_value "title"
       #=> "link_title_2"
   
     @browser.element(xpath: "//label[@for='blogposts']").attribute_value('checked')
       #=> "true"
       
    
### Page Object Design Pattern

To increase maintainability the RHD Acceptance Test suite follows a Page Object Design Pattern. A page object is a class that serves as an interface to a page of the RHD website. The tests then use the methods of this page object class whenever they need to interact with the UI of that page. The benefit is that if the UI changes for the page, the tests themselves don’t need to change, only the code within the page object needs to change. Subsequently all changes to support that new UI are located in one place.

The project contains three abstract classes `generic_base_page.rb`, `site_base.rb`, and `standardised_search.rb`.  

#### Generic Base class 

The generic base page class is what everything else extends. It contains the instantiation code common to all pages, and the class methods needed to define elements and methods (more on these later).

#### Site Base 

The Site Base extends the generic base class. It contains elements and methods that are common to all RHD pages. 

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

    Given(/^I am on the ([^"]*) page$/) do |page|
      case page.downcase
        when 'home'
          visit(HomePage)
        when 'technologies'
          visit(TechnologiesPage)
        when 'downloads'
          visit(DownloadsPage).wait_until_loaded
        when 'registration'
          visit LoginPage do |p|
            p.open_register_page
          end
        when 'login'
          visit LoginPage
        when 'stack overflow'
          visit(StackOverflowPage).wait_for_results
        when 'resources'
          visit(ResourcesPage).wait_for_results
        when 'product forums'
          visit(ForumsPage)
        when 'edit details'
          visit(EditAccountPage)
        when 'social login'
          visit(SocialLoginPage)
        when 'change password'
          visit(ChangePasswordPage)
        else
          fail("expected page '#{page}' was not recognised, please check feature")
      end
    end
    
    
    When(/^I click to download "([^"]*)"$/) do |product|
      data = all_available_downloads
      url = featured_download_for(data[product])
      on DownloadsPage do |page|
        page.click_to_download(url[1])
      end
    end
    
The `visit` and `on` methods are defined in a page-helper module that is mixed into the Cucumber World so these available on all step definitions. 

As named, the `visit` method instantiates and navigates to the page, whereas the `on` just instantiates it.

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

By default the tests are executed in parallel using the desktop profile and Chrome browser:

    parallel:
     -r features/
     -f progress
     -p parallel_html
     -t ~@ignore
     -t ~@manual
     -t ~@later
     -t ~@nightly
     -f rerun
     -o tmp/<%=ENV['RHD_TEST_PROFILE']%>/rerun<%= ENV['TEST_ENV_NUMBER'] %>.txt
     
     desktop:
       -p parallel
       -t ~@mobile
       -t ~@dm
       -t ~@kc

#### Mobile view

If you wish to execute the mobile view tests, you must use the mobile profile which is defined in `cucumber.yml` file:

    mobile:
      -p parallel
      -t ~@dm
      -t ~@kc
      -t ~@desktop RHD_JS_DRIVER=<%= ENV['RHD_JS_DRIVER'] || 'iphone_6' %>


    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=mobile --driver=iphone_6 
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=mobile --driver=iphone_6 
    
Mobile profiles are executed in parallel using a iphone 6 browser by default. All scenarios that are tagged with @desktop will be ignored. 

#### KC DM profile

Login, Register, and Download tests can be executed using the following profile:

    kc_dm:
      -p parallel
      --tags @kc,@dm
      
Keycloak and Download Manager tests are executed in parallel, and only executes tests that are tagged with `@kc` and `@dm`.
    
To run keycloak tests:

    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=kc_dm  
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=kc_dm 
   
### Switching Browser or device

By default the tests are executed using the Chrome browser, however it is possible to switch drivers.

The following browsers are available:

#### Firefox
   
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --driver=firefox 
    
#### Mobile drivers (using chrome dev tools)
    
It is possible to test on any mobile device that is available within the chrome dev tools. You can find the available devices within [chromium devices](_cucumber/driver/device config/chromium_devices.json).
    
   Example:

    ruby _cucumber/run_tests.rb --host-to-test=dev --profile=mobile --driver=nexus_6
    ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --profile=mobile --driver=nexus_6

    
#### Browserstack 

    TODO: We need to add browserstack configuration to the acceptance test
     
#### Cucumber tags
   
 Cucumber Tags are used to organise features and scenarios.  
  
     @desktop @smoke
      Scenario: A desktop site visitor has the options to log in and register via primary navigation bar.
        Given I am on the Home page
        Then I should see a primary nav bar with the following tabs:
          | Login    |
          | Register |
      
 As you can see this particular scenario is tagged with `@desktop` and `@smoke`. 
 
 If you wish to execute one or more scenarios containing a particular tag use the following:
 
     ruby _cucumber/run_tests.rb --host-to-test=dev --cucumber-tags=@desktop
     ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --cucumber-tags=@desktop
    
 If you wish to execute scenarios containing a multiple tags, use the following:
 
     ruby _cucumber/run_tests.rb --host-to-test=dev --cucumber-tags=@desktop,@smoke
     ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --cucumber-tags=@desktop,@smoke
     
The above will execute all scenarios that are tagged with both @desktop and @smoke.

Tags can also be used to ignore certain scenarios, for example:

     ruby _cucumber/run_tests.rb --host-to-test=dev --cucumber-tags=~@desktop,@smoke
     ruby _cucumber/run_tests.rb --use-docker --host-to-test=dev --cucumber-tags=~@desktop,@smoke
     
To ignore a particular tag, simple use the tilde(~) symbol before a tag.

Detailed information on tags can be found [here](https://github.com/cucumber/cucumber/wiki/Tags)  
 
#### Cucumber hooks 

Tags can also be used as hooks to define pre, or post test conditions:
 
    @logout @kc
     Scenario: A customer whom has the correct login credentials can log in using their username
      Given I am a RHD registered site visitor
      And I am on the Login page
      When I log in with a valid username
      Then I should be logged in
 
 Hooks are usually defined within `_cucumber/features/support/hooks.rb`
    
     After('@logout') do
      case $host_to_test
        when 'https://developers.redhat.com', 'https://developers.redhat.com'
          @browser.goto('https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
        else
          @browser.goto('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
      end
     end
 
Detailed information on cucumber tags can be found within the cucumber [documentation](https://github.com/cucumber/cucumber/wiki/Tags).

### CI Acceptance Test jobs

When a developer pushes their changes and raises a pull-request the [Drupal PR builder](http://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-pull-request-builder-drupal/) which on successful completion will trigger the 
[Drupal Acceptance Tests](http://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-acceptance-test-drupal/)

The acceptance test will be triggered with the following parameters:

    HOST_TO_TEST=http://developers-pr.stage.redhat.com/pr/${ghprbPullId}/export
    SHA_TO_BUILD=${sha1}
    CUCUMBER_TAGS=~@nightly,~@slow,~@prod
    ghprbPullId=${ghprbPullId}
    ghprbActualCommit=${ghprbActualCommit}
    STUBBED_DATA=true

On completion the tests will generate a cucumber report where you can view any failures and view screenshots. (More on this below)
    
    
#### Troubleshooting PR's    
    
If the acceptance tests fail on a pull request the first step would be to check the cucumber report.
     
Navigate to the Drupal acceptance test job, either from the PR or navigate directly to the [Drupal Acceptance test job](http://jenkins.mw.lab.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-acceptance-test-drupal/)
     
Click on affected build number for the failing pull-request:

[Cucumber Report](img/report.png)

Open Cucumber report:

[Cucumber Report Troubleshooting](img/overview_and_troubleshooting.png)

Cucumber report:
When the report is open you will see three tabs Overview, Features, Errors.

- Click on ‘Features’
- Scroll down to the failing feature and click.

The failing scenario will open and display more information about the failure, for example error message and screenshot.

[Cucumber Report Open](img/report_open.png)

[Cucumber Report Error](img/screenshot_error.png)


As you can see by the error above, there appears to be a problem with the download of cdk.

If the issue persists, and there are no known issues with download manager, you may need to ignore the test(s)

Tagging single scenario with @ignore
Checkout the rhd project - cd developers.redhat.com/_cucumber/features and tag the failing scenario with @ignore

In the above case you can see in the failure message that the feature is  “_cucumber/features/downloads/protected_downloads/download_page_cdk_featured_download.feature:13”
In this case

    @logout @ignore
    Scenario: 1. Newly registered site visitor navigates to the Download page and clicks on download latest product, upgrades account, and accepts Redhat T&C's should initiate the product download.
      Given I register a new account
      And I am logged in
      When I am on the Downloads page
      And I click to download "Red Hat Container Development Kit"
      Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit"


To ignore a full feature, simply add the @ignore tag to the top of the feature, for example:

    @ignore
    Feature: Red Hat Container Development Kit download

Now you have added the tag (or tags) to the scenario(s) you wish to ignore, raise and pull-request and get that merged.

If there are persistent issues related to keycloak, or download manager and you would like to exclude all tests related to these areas. You can modify the jenkins PR builder to ignore these features. 

#### Steps:
 - Navigate to the [pull request builder](http://jenkins.mw.lab.eng.bos.redhat.com/hudson/job/developers.redhat.com-pull-request-builder-drupal/).
 - Click on ‘configure’
 - Scroll down to ‘Predefined Parameters’
 - Here you will see the environment variable ‘CUCUMBER_TAGS’

[Jenkins PR Test Config](img/jenkins_pr_config.png)

 - To ignore all tests related to download-manager, the above would be changed to: `CUCUMBER_TAGS=~@nightly,~@dm`
 - To ignore all tests related to keycloak, the above would be changed to: `CUCUMBER_TAGS=~@nightly,~@kc`
 - To ignore both download-manager and keycloak test: `CUCUMBER_TAGS=~@nightly,~@dm,~@kc`

#### Known issues with downloads:
On occasions when downloading, some accounts are placed in ‘export hold’, you will see this from the screenshot, as the user is taken to the customer portal with the title ‘Export Hold’.
If this happens please let Frederick Sefcovic know and he can assist (details below).

#### Contacts:

Export Hold: [Frederick Sefcovic](fsefcovi@redhat.com)

Download Manager: [David Hladky](dhladky@redhat.com)

Keycloak: [Libor Krzyzanek](lkrzyzan@redhat.com)

#### Cross browser test job (staging)
When a PR has been merged the [staging drupal export build](http://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.staging.redhat.com-drupal-export/) will be triggered with these changes.
On successful completion of this build the [cross browser test job](https://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-acceptance-test-browserstack/) will be executed.

#### Production Smoke test job

When a PR has been merged the [production drupal export build](http://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-drupal-export/) will be triggered with these changes.
On successful completion of this build the [Drupal Acceptance Tests](http://jenkins.hosts.mwqe.eng.bos.redhat.com/hudson/view/jboss.org/job/developers.redhat.com-acceptance-test-drupal/)
will execute the @smoke and @prod tests.

### Hints and tips - work in progress

When working on a new feature, for example:

    Feature: I am a new feature
    
    @wip
    Scenario: I am a wip scenario
      Given I am learning cucumber
      When I would like to generate my step definitions
      Then I should tag a scenario with "@wip"
      
To execute a wip scenario, use a rake wip task:
      
      bundle exec rake wip
      
 The above task will run using a Chrome browser against your locally running drupal dev site preview (https://docker:9000)
     
 Once you have ran the wip task from terminal the step definitions will be generated:
 
     @wip
     Scenario: I am a wip scenario                       #   /Users/ian/Documents/workspace/redhat/developers.redhat.com/_cucumber/features/downloads/downloads_page.feature:9
     Given I am learning cucumber                      # /Users/ian/Documents/workspace/redhat/developers.redhat.com/_cucumber/features/downloads/downloads_page.feature:10
     When I would like to generate my step definitions # /Users/ian/Documents/workspace/redhat/developers.redhat.com/_cucumber/features/downloads/downloads_page.feature:11
     Then I should tag a scenario with "@wip"          # /Users/ian/Documents/workspace/redhat/developers.redhat.com/_cucumber/features/downloads/downloads_page.feature:12
 
     1 scenario (1 undefined)
     3 steps (3 undefined)
     0m0.039s
 
     You can implement step definitions for undefined steps with these snippets:
 
     Given(/^I am learning cucumber$/) do
      pending # Write code here that turns the phrase above into concrete actions
     end
 
     When(/^I would like to generate my step definitions$/) do
      pending # Write code here that turns the phrase above into concrete actions
     end
 
     Then(/^I should tag a scenario with "([^"]*)"$/) do |arg1|
      pending # Write code here that turns the phrase above into concrete actions
     end
 
 You can then copy the generated steps into your desired step definition file and add code in order to automate the scenario.
 
 If you wish to write tests against an alternative host:
      
     bundle exec rake wip HOST_TO_TEST=foo.com
      
 If you wish to run your test against an alternative driver, for example mobile view:  
    
     bundle exec rake wip HOST_TO_TEST=foo.com RHD_JS_DRIVER=iphone_6
    
  
