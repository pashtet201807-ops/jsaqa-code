describe("API пользователей", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
  });

  describe("Создание пользователя", () => {
    it("создаёт пользователя и возвращает его с присвоенным id", function () {
      const { newUser } = this.users;

      cy.createUser(newUser).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.include(newUser);
        expect(body.id).to.be.a("number");

        cy.getUser(body.id).its("body").should("deep.equal", body);
      });
    });
  });

  describe("Редактирование пользователя", () => {
    it("меняет имя и фамилию пользователя", function () {
      const { newUser, updatedUser } = this.users;

      cy.createUser(newUser)
        .its("body.id")
        .then((id) => {
          cy.updateUser(id, updatedUser).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body).to.deep.equal({ id, ...updatedUser });
          });

          cy.getUser(id)
            .its("body")
            .should("deep.equal", { id, ...updatedUser });
        });
    });
  });

  describe("Удаление пользователя", () => {
    it("удаляет пользователя", function () {
      const { newUser } = this.users;

      cy.createUser(newUser)
        .its("body.id")
        .then((id) => {
          cy.deleteUser(id).its("status").should("eq", 200);

          cy.getUser(id, { failOnStatusCode: false })
            .its("status")
            .should("be.gte", 400);

          cy.getUsers()
            .its("body")
            .then((users) => {
              expect(users.map((user) => user.id)).to.not.include(id);
            });
        });
    });
  });
});