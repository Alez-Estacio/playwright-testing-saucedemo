const BaseUrl = require('./base-page');

class CheckoutPage extends BaseUrl {
  constructor(page) {
    super(page);
    this.selectors = {
      firstNameField: '#first-name',
      lastNameField: '#last-name',
      zipCodeField: '#postal-code',
      continueButton: '#continue',
      finishButton: '#finish',
      itemTotal: '.summary_subtotal_label',
      tax: '.summary_tax_label',
      total: '.summary_total_label',
      successMessage: '.complete-header',
      errorMessage: '[data-test="error"]'
    };
  }

  async fillShippingInfo({ firstName, lastName, zipCode }) {
    await this.page.fill(this.selectors.firstNameField, firstName);
    await this.page.fill(this.selectors.lastNameField, lastName);
    await this.page.fill(this.selectors.zipCodeField, zipCode);
  }

  async continueToOverview() {
    await this.page.click(this.selectors.continueButton);
  }

  async completePurchase() {
    await this.page.click(this.selectors.finishButton);
  }

  async getSuccessMessage() {
    await this.waitForElement(this.selectors.successMessage);
    return await this.page.textContent(this.selectors.successMessage);
  }

  async getOrderTotals() {
    return {
      subtotal: await this.page.textContent(this.selectors.itemTotal),
      tax: await this.page.textContent(this.selectors.tax),
      total: await this.page.textContent(this.selectors.total)
    };
  }
}

module.exports = CheckoutPage;