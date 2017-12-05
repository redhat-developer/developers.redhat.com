import {BasePage} from './Base.page';
import {driver} from "../../config/DriverHelper";

class VideoPage extends BasePage {

    constructor(url) {
        super({
            path: `/video/${url}`,
            selector: '.video-page'
        });

        this.addSelectors({
            videoInfoBar: '.page-info-bar',
            videoPage: '.video-page',
            shareIcons: '.social-buttons',
            videoDescription: '.video-description',
            videoDescriptionExpanded: '.video-description .open',
            showMoreButton: '.show-more > .more',
            showLessButton: '.show-more > .less',
            videoSlides: '.slides > iframe',
            videoSlidesNote: '.slides > .slide-note',
            videoTranscript: '.video-transcript',

        });
    }

    get videoPage() {
        return browser.element('.video-page');
    }

    videoInfoBarIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoInfoBar'));
    }

    shareIconsAreDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('shareIcons'));
    }

    videoDescriptionIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoDescription'));
    }

    expandedVideoDescriptionIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoDescription'));
    }

    showMoreButtonIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('showMoreButton'));
    }

    showLessButtonIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('showLessButton'));
    }

    clickShowMore() {
        return driver.clickOn(videoPage.getSelector('showMoreButton'));
    }

    clickShowLess() {
        return driver.clickOn(videoPage.getSelector('showLessButton'));
    }

    videoSlidesAreDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoSlides'));
    }
    slidesNoteIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoSlidesNote'));
    }
    videoTranscriptIsDisplayed() {
        return driver.isDisplayed(videoPage.getSelector('videoTranscript'));
    }   
}

const videoPage = new VideoPage();

export {
    VideoPage
};
