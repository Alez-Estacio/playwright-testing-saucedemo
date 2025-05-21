const BaseUrl = require("./base-page");

class ProductsPage extends BaseUrl {
  constructor(page) {
    super(page);
    this.selectors = {
      productItem: ".inventory_item",
      productName: ".inventory_item_name",
      addToCartButton: "button.btn_inventory",
      cartIcon: ".shopping_cart_link",
      cartBadge: ".shopping_cart_badge",
    };
  }

  async addProductToCart(productName) {
    const products = await this.page.$$(this.selectors.productItem);
    for (const product of products) {
      const name = await product.$(this.selectors.productName);
      if ((await name.textContent()) === productName) {
        const button = await product.$(this.selectors.addToCartButton);
        await button.click();
        return;
      }
    }
    throw new Error(`Producto "${productName}" no encontrado`);
  }

  async getCartItemCount() {
    try {
      return await this.page.textContent(this.selectors.cartBadge);
    } catch (error) {
      return "0";
    }
  }

  async goToCart() {
    await this.page.click(this.selectors.cartIcon);
  }
}

module.exports = ProductsPage;
