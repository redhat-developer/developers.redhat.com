import Page from '../Page';

class Error404Page extends Page {
    open() {
        super.open('/404-error/');
    }
}

export default new Error404Page;
