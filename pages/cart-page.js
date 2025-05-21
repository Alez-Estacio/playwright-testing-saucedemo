const BaseUrl = require("./base-page");

class CartPage extends BaseUrl {
  constructor(page) {
    super(page);
    this.selectors = {
      cartItems: ".cart_item",
      itemName: ".inventory_item_name",
      itemPrice: ".inventory_item_price",
      checkoutButton: "#checkout",
      removeButton: "button.cart_button",
    };
  }

  async getCartItems() {
    const items = [];
    const elements = await this.page.$$(this.selectors.cartItems);

    for (const element of elements) {
      const name = await element.$(this.selectors.itemName);
      const price = await element.$(this.selectors.itemPrice);

      items.push({
        name: await name.textContent(),
        price: await price.textContent(),
      });
    }

    return items;
  }

  async removeProduct(productName) {
    const items = await this.page.$$(this.selectors.cartItems);
    for (const item of items) {
      const name = await item.$(this.selectors.itemName);
      if ((await name.textContent()) === productName) {
        const button = await item.$(this.selectors.removeButton);
        await button.click();
        return;
      }
    }
    throw new Error(`Producto "${productName}" no encontrado en el carrito`);
  }

  async proceedToCheckout() {
    await this.page.click(this.selectors.checkoutButton);
  }
}

module.exports = CartPage;
