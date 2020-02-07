import Page from "../Page";
import Driver from "../../utils/Driver.Extension";

class Home extends Page {
    get toolbarItemUser() {
        return $('#toolbar-item-user');
    }

    loggedInUser() {
        return Driver.textOf(this.toolbarItemUser);
    }
}

export default new Home;
