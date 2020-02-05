import Page from '../Page';

class Error403Page extends Page {
    open() {
        super.open('/403-error/');
    }
}

export default new Error403Page;
