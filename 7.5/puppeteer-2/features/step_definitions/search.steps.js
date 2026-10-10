const puppeteer = require("puppeteer");
const { expect } = require("chai");
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const {
  openSeance,
  selectFreeSeat,
  clickBookButton,
  isBookButtonDisabled,
  getTicketTitle,
} = require("../../lib/booking.js");

const { launch } = require("../../jest-puppeteer.config.js");

const SEAT_TYPES = { standard: "standart", vip: "vip" };

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await puppeteer.launch(launch);
  this.page = await this.browser.newPage();
  this.page.setDefaultTimeout(15000);
  this.page.setDefaultNavigationTimeout(30000);
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (url) {
  await this.page.goto(url);
});

When("user selects day {int} and time", async function (day) {
  await openSeance(this.page, day);
});

When("user selects {word} seat", async function (type) {
  await selectFreeSeat(this.page, SEAT_TYPES[type.toLowerCase()]);
});

When("user clicks booking button", async function () {
  await clickBookButton(this.page);
});

Then("user sees text {string}", async function (text) {
  const title = await getTicketTitle(this.page);
  expect(title).to.contain(text);
});

Then("booking button is disabled", async function () {
  const isDisabled = await isBookButtonDisabled(this.page);
  expect(isDisabled).to.be.true;
});