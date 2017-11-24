import {driver} from "../../../../config/browsers/DriverHelper";
import {BasePage} from "../Base.page";

class StackOverflowPage extends BasePage {

    constructor() {
        super({
            path: '/stack-overflow/',
            selector: '.stack-overflow',
        });

        this.addSelectors({
            loadingSpinner: '.loader',
            resultsLoaded: '.search-results-loaded',
            searchResults: '.stackoverflow-update .row',
            resultContent: '.qtn-content',
            resultHeading: '.stackoverflow-update .row h4 > a',
            answerCount: '.stackoverflow-update .update .answer-count h4',
            answer: '.qtn-answer',
            soAuthor: '.so-author',
            filterByProduct: '#filterByProduct',
            resultsPerPage: '.results-count'
        });

    }

    awaitSearchResults() {
        if (driver.isDisplayed(this.getSelector('loadingSpinner'))) {
            driver.awaitIsNotVisible(this.getSelector('loadingSpinner'), 30000);
        }
        return driver.awaitIsVisible(this.getSelector('resultsLoaded'), 3000)
    }

    getAllResults() {
        this.awaitSearchResults();
        return driver.elements(this.getSelector('searchResults'))
    }

    getAllResultsContent() {
        this.awaitSearchResults();
        return driver.elements(this.getSelector('resultContent'))
    }

    stackOverflowLinks() {
        return driver.elements(this.getSelector('resultHeading'))
    }

    stackOverflowAuthor() {
        return driver.elements(this.getSelector('soAuthor'))
    }

    selectFilterByProduct(product) {
        driver.selectByText(this.getSelector('filterByProduct'), product);
    }

    selectResultsPerPage(number) {
        driver.selectByText(this.getSelector('resultsPerPage'), number);
        return this.awaitSearchResults()
    }

    awaitResultsFor(productFilter) {
        driver.waitForUrlContaining(productFilter);
        return this.awaitSearchResults();
    }

    // looks through the current pages questions to check if an answer contains an answer
    // returns true, and an element that contains an answer
    queryQuestions(answer) {
        let results = this.getAllResults();
        for (let result = 0; result < results.value.length; ++result) {
            let parentLi = results.value[result].elements('.//*');
            for (let i = 0; i < parentLi.value.length; ++i) {
                let containsAnswer = parentLi.value[i].getAttribute("class");
                if (answer === 'with') {
                    if (containsAnswer.toString().indexOf('callout qtn-answer display-answer') > -1) {
                        driver.scrollIntoView(parentLi.value[i]);
                        return [true, parentLi.value[i]]
                    }
                } else {
                    if (containsAnswer.toString().indexOf('callout qtn-answer hide-answer') > -1) {
                        driver.scrollIntoView(parentLi.value[i]);
                        return [true, parentLi.value[i]]
                    }
                }
            }
        }
    }

    findQuestionWithAnswer() {
        let element;
        let count = 0;
        do {
            element = this._clickThroughResults('with');
            count++;
            if (count === 10) {
                throw new Error('None of the results contained an answer')
            }
        }
        while (typeof element === 'undefined' && count < 10);
        return element;
    }

    findQuestionWithoutAnswer() {
        let element;
        let count = 0;
        do {
            element = this._clickThroughResults('without');
            count++;
            if (count === 10) {
                throw new Error('All of the results had answers')
            }
        }
        while (typeof element === 'undefined' && count < 10);
        return element;
    }

    clickReadFullQuestion(el) {
        return el.click('*=Read full question')
    }

    _clickThroughResults(negate) {
        let el = this.queryQuestions(negate);
        if (typeof el === 'undefined') {
            driver.clickOn('//*[@id="pagination-next"]/a');
            this.awaitSearchResults()
        } else {
            return el[1]
        }
    }
}


const
    stackOverflowPage = new StackOverflowPage();

export {
    stackOverflowPage
};
