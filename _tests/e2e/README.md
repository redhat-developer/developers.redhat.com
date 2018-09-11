RHDP Site End-to-end Testing
=============================

## Run E2E Test suite

In the root of the project directory execute the following command:

Full suite:

        ruby _tests/run_tests.rb --e2e --use-docker --base-url=https://developers.stage.redhat.com
        
Sanity:
        
        ruby _tests/node_jenkins_test_runner.rb sanity https://developers.redhat.com        
        
## Run e2e tests locally

        npm run e2e
        
## Run Single test
Add something unique to the test `it.` description, for example to execute the following scenario:

        it('@wip should allow users to log-in and download promotional cheetsheets', function () {
                    this.retries(1);
                    let siteUser = new User(process.env.RHD_BASE_URL).rhdAccountDetails();
                    let cheatSheet = new CheatSheets('advanced-linux-commands');
                    cheatSheet
                        .open();
                    cheatSheet
                        .awaitLoaded();
                    cheatSheet
                        .clickLoginToDownloadBtn();
                    login
                        .awaitLogin();
                    login
                        .with(siteUser);
                    home
                        .awaitIsLoggedIn(siteUser);
                    cheatSheet
                        .awaitDownloadConfirmation();
                    cheatSheet
                        .awaitDownloadThankYou();
                    downloadSize = downloadDir.get();
                    try {
                      expect(downloadSize).to.eventually.eq(1);
                    } catch (e) {
                        console.log(`Failed to download advanced-linux-commands cheatsheet. Expected 1, but found ${downloadSize}.`)
                    }
                });
                
 Would be: `npm run e2e --  --mochaOpts.grep=@wip` 
 
 ## Override the default (local) url:
 
 The default baseUrl when running tests locally is set to `http://docker:8888`. To override this, you can execute:
 
              RHD_BASE_URL=https://developers.redhat.com npm run e2e --  --mochaOpts.grep=@wip               
                       
