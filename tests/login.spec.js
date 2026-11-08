import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("valid user can log in", async function ({ page }) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory\.html$/);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test("valid invalid user cannot log in", async function ({ page }) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "wrong_password");

  await expect(page.getByRole("alert")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
