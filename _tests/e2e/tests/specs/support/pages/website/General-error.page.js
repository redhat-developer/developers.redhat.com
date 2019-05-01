import Page from '../Page';

class GeneralErrorPage extends Page {
    open() {
        super.open('/general-error/');
    }
}

export default new GeneralErrorPage;
