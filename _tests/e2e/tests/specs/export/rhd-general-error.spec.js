import GeneralErrorPage from '../support/pages/website/General-error.page';
import Driver from '../support/utils/Driver.Extension';

describe('General Error Page', function() {
    // eslint-disable-next-line no-invalid-this
    this.retries(2);

    it("should contain an <h3> with 'Oh no! We've got a strange feeling about this ...' inside it", () => {
        GeneralErrorPage.open('/general-error/');
        expect(Driver.getPageSource()).to.include("<h3>Oh no! We've got a strange feeling about this ...</h3>");
    });
});
