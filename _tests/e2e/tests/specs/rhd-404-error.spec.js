import error404Page from './support/pages/404-error.page';

describe('404 Error Page', function() {
    this.retries(2);

    it("should contain an <h1> with '404: You've found something, but not the page you're looking for.' inside it", () => {
        error404Page.open('/404-error/');
        expect(error404Page.error()).to.include("404: You've found something, but not the page you're looking for.");
    });
});
