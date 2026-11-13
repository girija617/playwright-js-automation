import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
});

test("valid user can log in", async function ({ page }) {
  const loginPage = new LoginPage(page);

  //await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory\.html$/);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test("user cannot log in with an incorrect password", async function ({
  page,
}) {
  const loginPage = new LoginPage(page);

  // await loginPage.open();
  await loginPage.login("standard_user", "wrong_password");

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("user cannot log in with a blank username", async function ({ page }) {
  const loginPage = new LoginPage(page);

  //await loginPage.open();
  await loginPage.login("", "secret_sauce");

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username is required",
  );
});

test("user cannot log in with a blank password", async function ({ page }) {
  const loginPage = new LoginPage(page);

  //await loginPage.open();
  await loginPage.login("standard_user", "");

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Password is required",
  );
});

test.only("valid user can log in and add product to cart", async function ({
  page,
}) {
  const loginPage = new LoginPage(page);

  //await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory\.html$/);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
  // Add a product to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Verify that the product was added to the cart
  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  // Navigate to the cart page
  await page.locator(".shopping_cart_link").click();

  // Verify that the product is in the cart
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});
