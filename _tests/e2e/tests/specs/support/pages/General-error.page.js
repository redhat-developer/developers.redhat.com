import Page from './Page';
import Driver from '../utils/Driver.Extension';

class GeneralErrorPage extends Page {
    get errorTitle() {return $('h3');}
    open() {
        super.open('/general-error/');
    }

    error() {
        return Driver.textOf(this.errorTitle);
    }
}

export default new GeneralErrorPage;
