const { clickElement, getText } = require("./commands.js");

const SELECTORS = {
  day: (number) => nav.page-nav a:nth-child(${number}),
  chosenDayClass: ".page-nav__day_chosen",
  seance: ".movie-seances__time",

  hallScheme: ".buying-scheme__chair_standart, .buying-scheme__chair_vip",
  freeSeat: (type) =>
    .buying-scheme__chair_${type}:not(.buying-scheme__chair_taken),
  bookButton: "button.acceptin-button",
  ticketTitle: ".ticket__check-title",
};

async function openSeance(page, day = 2) {
  const daySelector = SELECTORS.day(day);
  await clickElement(page, daySelector);

  await page.waitForSelector(${daySelector}${SELECTORS.chosenDayClass});
  await clickElement(page, SELECTORS.seance);
  await page.waitForSelector(SELECTORS.hallScheme);
}

async function selectFreeSeat(page, type) {
  await clickElement(page, SELECTORS.freeSeat(type));
}

async function clickBookButton(page) {
  await clickElement(page, SELECTORS.bookButton);
}

async function isBookButtonDisabled(page) {
  try {
    await page.waitForSelector(${SELECTORS.bookButton}[disabled], {
      timeout: 5000,
    });
    return true;
  } catch (error) {

    if (error.name !== "TimeoutError") {
      throw error;
    }
    return false;
  }
}

async function getTicketTitle(page) {
  return getText(page, SELECTORS.ticketTitle);
}

module.exports = {
  SELECTORS,
  openSeance,
  selectFreeSeat,
  clickBookButton,
  isBookButtonDisabled,
  getTicketTitle,
};