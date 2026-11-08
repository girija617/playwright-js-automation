# Playwright JavaScript Automation

An automation learning project using Playwright and JavaScript
to test the SauceDemo ecommerce website.

## Current test coverage

- Login page displays the Login button
- Successful login with valid credentials
- Error message for an incorrect password

## Tools

- JavaScript
- Playwright Test
- Git and GitHub

## Setup

Install Node.js, then run:

```bash
npm ci
npx playwright install
```

## Run login tests

```bash
npx playwright test tests/login.spec.js --project=chromium
```

To see the browser while tests run:

```bash
npx playwright test tests/login.spec.js --project=chromium --headed
```

## Project structure

- tests/ — automated test cases
- playwright.config.js — Playwright settings
- package.json — project dependencies
- package-lock.json — exact dependency versions

## Planned improvements

- Page Object Model
- Cart and checkout tests
- Reusable test data and fixtures
- GitHub Actions
