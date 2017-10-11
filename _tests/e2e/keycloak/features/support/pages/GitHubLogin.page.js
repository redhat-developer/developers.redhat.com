class GitHubLoginPage {

    get githubLogin() {
        return $('#login')
    }

    get usernameField() {
        return $('#login_field')
    }

    get passwordField() {
        return $('#password')
    }

    get loginBtn() {
        return $('.btn')
    }

    login(username, password) {
        this.githubLogin.waitForVisible(9000);
        this.usernameField.setValue(username);
        this.passwordField.setValue(password);
        this.loginBtn.click()
    }
}

module.exports = GitHubLoginPage;