describe("Приложение для работы с книгами", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Отображает главную страницу", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Успешный вход с верными данными", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Не входит с пустым логином", () => {
    cy.login(null, "test");
    cy.get("#mail:invalid").should("exist");
  });

  it("Не входит с пустым паролем", () => {
    cy.login("test@test.com", null);
    cy.get("#pass:invalid").should("exist");
  });
});