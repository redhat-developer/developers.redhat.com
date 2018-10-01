import {Error404Page} from './support/pages/website/404-error.page';

describe('404 Error Page', function () {
    this.retries(2);

    it("@sanity : should contain an <h1> with '404: You've found something, but not the page you're looking for.' inside it", function () {
        let error404Page = new Error404Page();
        error404Page.open('/404-error/');
        expect(error404Page.source()).to.include("<h1>404: You've found something, but not the page you're looking for.</h1>");
    });
});

