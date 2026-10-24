import selectors from "../fixtures/selectors.json";

const { client } = selectors;

describe("Бронирование билета в зале из админки", () => {
  beforeEach(function () {
    cy.fixture("adminLogin").as("users");
  });

  it("Бронирует место в зале, название которого взято из админки", function () {
    cy.adminLogin(this.users.happy);
    cy.getHallNames().then((hallNames) => {
      cy.openClient();
      cy.openSeanceInHall(hallNames).then((hallName) => {
        cy.bookSeat();
        cy.get(client.ticketTitle).should("contain.text", "Вы выбрали билеты:");
        cy.contains(hallName).should("be.visible");
      });
    });
  });
});