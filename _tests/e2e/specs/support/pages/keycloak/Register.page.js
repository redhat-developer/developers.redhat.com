import {Page} from "../Page"

export class Register extends Page {

    constructor() {
        super({path: '/register'});

        this.addSelectors({
            registerForm: '#kc-register-form'
        });
    }

    displayed() {
        return this.displayed(this.getSelector('registerForm'));
    }
}
