class BaseUrl {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
    fullPage: true;
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: "visible" });
  }
}

module.exports = BaseUrl;
