import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("valid user can log in", async function ({ page }) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory\.html$/);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test("user cannot log in with an incorrect password", async function ({
  page,
}) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "wrong_password");

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
