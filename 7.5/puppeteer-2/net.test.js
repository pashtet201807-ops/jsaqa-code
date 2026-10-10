const {
  openSeance,
  selectFreeSeat,
  clickBookButton,
  isBookButtonDisabled,
  getTicketTitle,
} = require("./lib/booking.js");

const URL = "http://qamid.tmweb.ru/client/index.php";
const TICKET_TITLE = "Вы выбрали билеты:";

let page;

describe("ИдёмВКино - Тесты бронирования билетов", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);
    await page.goto(URL);
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  test("Happy Path 1: Успешное бронирование 1 обычного места", async () => {
    await openSeance(page, 2);

    await selectFreeSeat(page, "standart");
    await clickBookButton(page);
    expect(await getTicketTitle(page)).toContain(TICKET_TITLE);
  });

  test("Happy Path 2: Успешное бронирование VIP места", async () => {
    await openSeance(page, 2);
    await selectFreeSeat(page, "vip");
    await clickBookButton(page);

    expect(await getTicketTitle(page)).toContain(TICKET_TITLE);
  });

  test("Sad Path: Кнопка забронировать недоступна без выбора места", async () => {
    await openSeance(page, 2);
    const isDisabled = await isBookButtonDisabled(page);
    expect(isDisabled).toBe(true);
  });
});