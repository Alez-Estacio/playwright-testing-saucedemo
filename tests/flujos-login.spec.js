const { test, expect } = require('@playwright/test');
const users = require('../fixtures/users.json');

test.describe('Flujo E2E 2: Login y validación de restricciones', () => {
  let page;
  let loginPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new (require('../pages/login-page'))(page);
    await loginPage.navigate();
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await loginPage.takeScreenshot(`failed-${testInfo.title}`);
    }
    await page.close();
  });

  test('Login exitoso y logout', async ({}) => {
    await test.step('Login con usuario válido', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
      await expect(page).toHaveURL(/inventory.html/);
    });

    await test.step('Logout exitoso', async () => {
      await page.click('#react-burger-menu-btn');
      await page.click('#logout_sidebar_link');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test('Validar usuario bloqueado', async ({}) => {
    await loginPage.login(users.locked.username, users.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out');
  });

  test('Validar credenciales incorrectas', async ({}) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('Acceso a ruta interna sin autenticar', async ({}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: You can only access \'/inventory.html\' when you are logged in');
  });

  test('Validar campos obligatorios', async ({}) => {
    await test.step('Intentar login sin datos', async () => {
      await loginPage.login('', '');
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('Epic sadface: Username is required');
    });

    await test.step('Solo contraseña', async () => {
      await loginPage.login('', 'password');
      expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Username is required');
    });

    await test.step('Solo usuario', async () => {
      await loginPage.login('standard_user', '');
      expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Password is required');
    });
  });
});