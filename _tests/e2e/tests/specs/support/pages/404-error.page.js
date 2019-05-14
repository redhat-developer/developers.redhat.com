import Page from './Page';
import Driver from '../utils/Driver.Extension';

class Error404Page extends Page {
    get errorTitle() {return $('h1');}

    open() {
        super.open('/404-error/');
    }

    error() {
        return Driver.textOf(this.errorTitle);
    }
}

export default new Error404Page;
