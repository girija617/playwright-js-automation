export class ProductsPage {
  constructor(page) {
    this.addBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
