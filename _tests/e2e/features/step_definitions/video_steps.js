import {VideoPage} from '../../support/pages/Video.page';
import {homePage} from '../../support/pages/Home.page';
import {siteNav} from "../../support/sections/NavigationBar.section";
import {driver} from "../../config/DriverHelper";


const videoSteps = function () {

    let videoPage = new VideoPage();

    this.Then(/^I am on the video page$/, function () {
        let videoPage = new VideoPage('youtube/S3auoOqwDS8');
        videoPage.open();
    });

    this.Then(/^I am on the video page with a SlideShare deck$/, function () {
        let videoPage = new VideoPage('youtube/S3auoOqwDS8');
        videoPage.open();
    });

    this.Then(/^I am on the video page with a video transcript$/, function () {
        let videoPage = new VideoPage('youtube/S3auoOqwDS8');
        videoPage.open();
    });
    
    this.Then(/^I should see the speaker's name and the publish date$/, function () {
        expect(videoPage.videoInfoBarIsDisplayed()).to.eq(true);
    });

    this.Then(/^display sharing icons$/, function () {
      expect(videoPage.shareIconsAreDisplayed()).to.eq(true);
    });

    this.Given(/^display the short description$/, function () {
        expect(videoPage.videoDescriptionIsDisplayed()).to.eq(true);
    });

    this.Given(/^display “Show More” link underneath expanded details view$/, function () {
        expect(videoPage.showMoreButtonIsDisplayed()).to.eq(true);
    });

    this.When(/^I click on “Show More” underneath the short description$/, function () {
        videoPage.clickShowMore();
    });

    this.Then(/^display the long description$/, function () {
        expect(videoPage.expandedVideoDescriptionIsDisplayed()).to.eq(true);
    });

    this.Then(/^display the Speaker’s Name with a short bio underneath the long description$/, function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
    });

    this.Then(/^display tags underneath the Speaker’s bio$/, function () {
        // Write code here that turns the phrase above into concrete actions
        return 'pending';
    });

    this.Then(/^display “Show Less” link underneath expanded details view$/, function () {
        expect(videoPage.showLessButtonIsDisplayed()).to.eq(true);
    });

    this.When(/^I click on “Show Less” underneath the expanded details view$/, function () {
        videoPage.clickShowLess();
    });

    this.Then(/^display the slide deck side\-by\-side to the video$/, function () {
        expect(videoPage.videoSlidesAreDisplayed()).to.eq(true);
    });
    
    this.Then(/^display “Note: Slides do not auto\-advance” beneath the slides$/, function () {
        expect(videoPage.slidesNoteIsDisplayed()).to.eq(true);
    });

    this.Then(/^display the transcript underneath the description$/, function () {
        expect(videoPage.videoTranscriptIsDisplayed()).to.eq(true);
    });
};

module.exports = videoSteps;
