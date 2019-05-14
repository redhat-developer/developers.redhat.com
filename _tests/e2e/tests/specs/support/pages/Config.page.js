import Page from "./Page";
import Driver from "../utils/Driver.Extension";

export class Config extends Page {
    get changesBody() {return $('.empty');}

    open() {
        Driver.visit(this.drupalHost() + '/admin/config/development/configuration');
    }

    changes() {
        return Driver.textOf(this.changesBody);
    }
}
export default new Config;
