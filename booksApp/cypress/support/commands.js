Cypress.Commands.add("login", (email, password) => {
  if (email) {
    cy.get("#mail").type(email);
  }
  if (password) {
    cy.get("#pass").type(password);
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", ({ title, description, authors, favorite }) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#description").type(description);
  cy.get("#authors").type(authors);
  if (favorite) {
    cy.get("#favorite").check();
  }
  cy.contains("Submit").click();
});

Cypress.Commands.add("openFavorites", () => {
  cy.contains("Favorites").click();
});

Cypress.Commands.add("clickInBookCard", (title, buttonText) => {
  cy.contains(title).closest(".card").contains(buttonText).click();
});