const { test, expect } = require("@playwright/test");
const users = require("../fixtures/users.json");
const { products, checkoutInfo } = require("../fixtures/testData.json");

test.describe("Flujo E2E 1: Compra exitosa de productos", () => {
  let page;
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new (require("../pages/login-page"))(page);
    productsPage = new (require("../pages/products-page"))(page);
    cartPage = new (require("../pages/cart-page"))(page);
    checkoutPage = new (require("../pages/checkout-page"))(page);

    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await loginPage.takeScreenshot(`failed-${testInfo.title}`);
    }
    await page.close();
  });

  test("Compra exitosa de 2 productos", async ({}) => {
    await test.step("1. Agregar 2 productos al carrito", async () => {
      await productsPage.addProductToCart(products[0].name);
      await productsPage.addProductToCart(products[1].name);
      expect(await productsPage.getCartItemCount()).toBe("2");
    });

    await test.step("2. Verificar carrito", async () => {
      await productsPage.goToCart();
      const items = await cartPage.getCartItems();
      expect(items).toHaveLength(2);
      expect(items[0].name).toBe(products[0].name);
      expect(items[0].price).toBe(products[0].price);
    });

    await test.step("3. Completar checkout", async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillShippingInfo(checkoutInfo);
      await checkoutPage.continueToOverview();

      const totals = await checkoutPage.getOrderTotals();
      expect(totals.subtotal).toContain("$39.98");
      expect(totals.tax).toContain("$3.20");
      expect(totals.total).toContain("$43.18");

      await checkoutPage.completePurchase();
      expect(await checkoutPage.getSuccessMessage()).toContain(
        "Thank you for your order"
      );
    });
  });

  test("Validar cambio de total al eliminar producto", async ({}) => {
    await productsPage.addProductToCart(products[0].name);
    await productsPage.addProductToCart(products[1].name);
    await productsPage.goToCart();

    await test.step("Eliminar un producto", async () => {
      await cartPage.removeProduct(products[0].name);
      expect(await cartPage.getCartItems()).toHaveLength(1);
    });

    await test.step("Verificar total actualizado", async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillShippingInfo(checkoutInfo);
      await checkoutPage.continueToOverview();

      const totals = await checkoutPage.getOrderTotals();
      expect(totals.subtotal).toContain("$9.99");
    });
  });

  test("Intentar checkout sin productos", async ({}) => {
    await test.step("1. Verificar carrito vacío", async () => {
      await productsPage.goToCart();
      expect(await cartPage.getCartItems()).toHaveLength(0);
    });

    await test.step("2. Intentar checkout y verificar redirección", async () => {
      const checkoutButton = await page.$("#checkout");
      expect(checkoutButton).toBeTruthy();
      await checkoutButton.click();
      expect(page.url()).toContain("checkout-step-one.html");
    });
  });

  test("Validar formato de precios e impuestos", async ({}) => {
    await productsPage.addProductToCart(products[0].name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo(checkoutInfo);
    await checkoutPage.continueToOverview();

    const totals = await checkoutPage.getOrderTotals();

    await test.step("Verificar formato de precios", async () => {
      const pricePattern = /(^| )\$\d+\.\d{2}$/;
      expect(totals.subtotal).toMatch(pricePattern);
      expect(totals.tax).toMatch(pricePattern);
      expect(totals.total).toMatch(pricePattern);

      
      expect(totals.subtotal).toContain("$29.99");
      expect(totals.tax).toContain("$2.40");
      expect(totals.total).toContain("$32.39");
    });

    await test.step("Verificar visibilidad", async () => {
      expect(await page.isVisible(".summary_subtotal_label")).toBeTruthy();
      expect(await page.isVisible(".summary_tax_label")).toBeTruthy();
      expect(await page.isVisible(".summary_total_label")).toBeTruthy();
    });
  });
});
