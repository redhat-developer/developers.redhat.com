import Error403Page from '../support/pages/website/403-error.page';
import Driver from '../support/utils/Driver.Extension';

describe('403 Error Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it("should contain an <h1> with '403: Access is denied' inside it", () => {
        Error403Page.open('/403-error/');
        expect(Driver.getPageSource()).to.include("<h1>403: Access is denied</h1>");
    });
});
