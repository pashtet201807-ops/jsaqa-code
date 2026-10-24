import selectors from "../fixtures/selectors.json";

const { admin } = selectors;

describe("Вход в админку", () => {
  beforeEach(function () {
    cy.fixture("adminLogin").as("users");
  });

  it("Администратор входит с верными данными (happy path)", function () {
    cy.adminLogin(this.users.happy);
    cy.contains("Управление залами").should("be.visible");
  });

  it("Не входит с неверным паролем (sad path)", function () {
    cy.adminLogin(this.users.sadWrongPassword);
    cy.contains(this.users.sadWrongPassword.errorText).should("be.visible");
    cy.contains("Управление залами").should("not.exist");
  });

  it("Не входит с неизвестным пользователем (sad path)", function () {
    cy.adminLogin(this.users.sadUnknownUser);
    cy.contains(this.users.sadUnknownUser.errorText).should("be.visible");
    cy.get(admin.passwordInput).should("be.visible");
  });
});