const { clickElement, getText } = require("./lib/commands.js");

let page;

describe("ИдёмВКино - Тесты бронирования билетов", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  }, 60000);

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  }, 60000);

  test("Happy Path 1: Успешное бронирование 1 обычного места", async () => {
    await clickElement(page, "nav.page-nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time");
    
    const seatSelector = ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
    await page.waitForSelector(seatSelector);
    await clickElement(page, seatSelector);
    
    const buttonSelector = "button.acceptin-button";
    await page.waitForSelector(buttonSelector);
    await clickElement(page, buttonSelector);

    const actualText = await getText(page, ".ticket__check-title");
    expect(actualText).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Happy Path 2: Успешное бронирование VIP места", async () => {
    await clickElement(page, "nav.page-nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time");
    
    const seatSelector = ".buying-scheme__chair_vip:not(.buying-scheme__chair_taken)";
    await page.waitForSelector(seatSelector);
    await clickElement(page, seatSelector);
    
    const buttonSelector = "button.acceptin-button";
    await page.waitForSelector(buttonSelector);
    await clickElement(page, buttonSelector);

    const actualText = await getText(page, ".ticket__check-title");
    expect(actualText).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Sad Path: Кнопка забронировать недоступна без выбора места", async () => {
    await clickElement(page, "nav.page-nav a:nth-child(2)");
    await clickElement(page, ".movie-seances__time");

    const buttonSelector = "button.acceptin-button";
    await page.waitForSelector(buttonSelector); // Ждем отрисовки кнопки
    const isDisabled = await page.$eval(buttonSelector, (btn) => btn.disabled);
    expect(isDisabled).toBe(true);
  }, 60000);
});