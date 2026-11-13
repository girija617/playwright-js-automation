import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";

test.beforeEach(async function ({ page }) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");
});

test("valid user can log in and add product to cart", async function ({
  page,
}) {
  const productsPage = new ProductsPage(page);

  //verify that the user is logged in and inventory page is displayed
  await expect(page).toHaveURL(/inventory\.html$/);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
  // Add a product to the cart
  await productsPage.addBackpackToCart();

  // Verify that the product was added to the cart
  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]'),
  ).toBeVisible();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  // Navigate to the cart page
  await productsPage.openCart();

  //Verify that user is navigated to the cart page
  await expect(page).toHaveURL(/cart\.html$/);

  // Verify that the product is in the cart
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});
