import selectors from "../fixtures/selectors.json";

const { client } = selectors;

describe("Главная страница ИдёмВКино", () => {
  beforeEach(() => {
    cy.openClient();
  });

  it("Показывает правильный заголовок страницы", () => {
    cy.title().should("eq", "ИдёмВКино");
  });

  it("Показывает название сервиса в шапке", () => {
    cy.get(client.headerTitle)
      .should("be.visible")
      .invoke("text")
      .should("match", /идёмвкино/i);
  });

  it("Показывает навигацию по дням недели", () => {
    cy.get(client.days).should("have.length.at.least", 7);
  });

  it("Подсвечивает выбранный день", () => {
    cy.get(client.days).eq(1).click();
    cy.get(client.days).eq(1).should("have.class", client.chosenDayClass);
  });

  it("Показывает фильмы с названиями и временем сеансов", () => {
    cy.get(client.movie).should("have.length.at.least", 1);
    cy.get(client.movieTitle).first().invoke("text").should("not.be.empty");
    cy.get(client.seance).should("have.length.at.least", 1);
  });
});