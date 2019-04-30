import Error404Page from '../support/pages/website/404-error.page';
import Driver from '../support/utils/Driver.Extension';

describe('404 Error Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it("should contain an <h1> with '404: You've found something, but not the page you're looking for.' inside it", () => {
        Error404Page.open('/404-error/');
        expect(Driver.getPageSource()).to.include("<h1>404: You've found something, but not the page you're looking for.</h1>");
    });
});
