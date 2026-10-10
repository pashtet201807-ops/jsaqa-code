const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('user is on {string} page', async function (url) {
  await this.page.goto(url);
});

When('user selects day {int} and time', async function (dayIndex) {
  const daySelector = `nav.page-nav a:nth-child(${dayIndex})`;
  await this.page.waitForSelector(daySelector);
  await this.page.click(daySelector);

  const timeSelector = ".movie-seances__time";
  await this.page.waitForSelector(timeSelector);
  await this.page.click(timeSelector);
});

When('user selects standard seat', async function () {
  const seatSelector = ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
  await this.page.waitForSelector(seatSelector);
  await this.page.click(seatSelector);
});

When('user clicks booking button', async function () {
  const buttonSelector = "button.acceptin-button";
  await this.page.waitForSelector(buttonSelector);
  await this.page.click(buttonSelector);
});

Then('user sees text {string}', async function (expectedText) {
  const titleSelector = ".ticket__check-title";
  await this.page.waitForSelector(titleSelector);
  const actualText = await this.page.$eval(titleSelector, (el) => el.textContent.trim());
  expect(actualText).to.include(expectedText);
});

Then('booking button is disabled', async function () {
  const buttonSelector = "button.acceptin-button";
  await this.page.waitForSelector(buttonSelector);
  const isDisabled = await this.page.$eval(buttonSelector, (btn) => btn.disabled);
  expect(isDisabled).to.be.true;
});
