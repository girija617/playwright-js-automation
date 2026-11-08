import { test, expect } from "@playwright/test";

test("login page displays the login button", async function ({ page }) {
  await page.goto("https://www.saucedemo.com/");

  const loginButton = page.getByRole("button", { name: "Login" });

  await expect(loginButton).toBeVisible();

  //login with valid credentials
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.waitForTimeout(2000);

  await loginButton.click();

  //assert that the error message is displayed
  const errorMessage = page.getByText(
    "Epic sadface: Username and password do not match any user in this service",
  );
  await expect(errorMessage).toBeVisible();

  await page.waitForTimeout(3000);
});
