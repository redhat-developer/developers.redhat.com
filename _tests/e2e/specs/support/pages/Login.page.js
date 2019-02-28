import {Page} from "./Page"
import {Keycloak} from "./Keycloak.Login.page";
import {Drupal} from "./Drupal.Login.page";

export class Login extends Page {

    constructor() {
        super();
        this.keycloak = new Keycloak();
        this.drupal = new Drupal();
    }

}
