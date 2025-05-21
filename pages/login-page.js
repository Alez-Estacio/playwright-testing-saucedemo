const BasePage = require("./base-page");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.selectors = {
      usernameField: "#user-name",
      passwordField: "#password",
      loginButton: "#login-button",
      errorMessage: '[data-test="error"]',
    };
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username, password) {
   
    await this.page.fill(this.selectors.usernameField, username);
    await this.page.fill(this.selectors.passwordField, password);
    await this.page.click(this.selectors.loginButton);
  }

  async getErrorMessage() {
    await this.waitForElement(this.selectors.errorMessage);
    return await this.page.textContent(this.selectors.errorMessage);
  }
}

module.exports = LoginPage;