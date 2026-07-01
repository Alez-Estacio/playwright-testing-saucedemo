# Playwright E2E Test Automation Challenge

## Overview

This repository contains an end-to-end test automation project built with **Playwright** to validate key user flows on the [SauceDemo](https://www.saucedemo.com/) sample web application.

The project is designed using the **Page Object Model (POM)** pattern to keep test code maintainable, reusable, and easy to scale. Test data is managed through JSON fixtures, and execution evidence is generated through reports and screenshots.

## Tech Stack

* Playwright
* JavaScript
* Node.js
* npm
* Page Object Model
* JSON fixtures
* HTML test reports

## Prerequisites

Before running the project, make sure you have the following installed:

* Node.js 18 or later
* npm
* Git

> Node.js 20+ is recommended for better compatibility with modern Playwright versions.

## Installation

Clone the repository:

```bash
git clone https://github.com/Alez-Estacio/playwright-testing-saucedemo.git
```

Navigate to the project folder:

```bash
cd playwright-testing-saucedemo
```

Install project dependencies:

```bash
npm install
```

Install Playwright browser binaries:

```bash
npx playwright install
```

## Project Structure

```text
playwright-testing-saucedemo/
├── fixtures/              # Test data and JSON files
├── pages/                 # Page Object Model classes
├── tests/                 # Automated test cases
├── utils/                 # Utility functions and helpers
├── reports/               # Generated reports and test evidence
│   └── screenshots/       # Failure screenshots
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies and npm scripts
└── README.md              # Project documentation
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

```bash
npx playwright test --project=firefox
```

```bash
npx playwright test --project=webkit
```

Run tests using Playwright UI Mode:

```bash
npx playwright test --ui
```

## Reports and Evidence

After test execution, Playwright can generate an HTML report with the test results.

Open the latest HTML report:

```bash
npx playwright show-report
```

Failure screenshots are stored in:

```text
reports/screenshots/
```

## Configuration

The main Playwright configuration is located in:

```text
playwright.config.js
```

From this file, you can configure:

* Test directory
* Browser projects
* Base URL
* Timeouts
* Reporters
* Screenshots
* Traces
* Retries

## Test Design

This project follows the **Page Object Model** pattern to separate test logic from page interactions. This approach improves readability, reduces code duplication, and makes the automation framework easier to maintain.

Test data is handled through JSON files located in the `fixtures/` directory, allowing test scenarios to be updated without modifying the test logic.

## Author

**Alezander Estacio**

QA Automation Engineer
