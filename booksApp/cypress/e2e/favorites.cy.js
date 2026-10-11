const newBook = (favorite) => ({
  title: `Тестовая книга ${Date.now()}`,
  description: "Описание тестовой книги",
  authors: "Тестовый автор",
  favorite,
});

describe("Избранные книги", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Книга, добавленная сразу в избранное, появляется в избранном", () => {
    const book = newBook(true);
    cy.addBook(book);
    cy.openFavorites();
    cy.contains(book.title).should("be.visible");
  });

  it("Книгу из общего списка можно добавить в избранное", () => {
    const book = newBook(false);
    cy.addBook(book);
    cy.clickInBookCard(book.title, "Add to favorite");
    cy.openFavorites();
    cy.contains(book.title).should("be.visible");
  });

  it("Книгу можно удалить из избранного", () => {
    const book = newBook(true);
    cy.addBook(book);
    cy.openFavorites();
    cy.clickInBookCard(book.title, "Delete from favorite");
    cy.contains(book.title).should("not.exist");
  });
});