import Page from './Page';
import Driver from '../utils/Driver.Extension';

class Home extends Page {
    get drupalAdminToolbar() {return $('.toolbar-bar');}

    open() {
        super.open('/');
    }

    awaitAdminIsLoggedIn() {
        return Driver.awaitIsDisplayed(this.drupalAdminToolbar);
    }
}

export default new Home;
