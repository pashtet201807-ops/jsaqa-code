Cypress.Commands.add("getUsers", () => {
  return cy.request({ method: "GET", url: "/users" });
});

Cypress.Commands.add("getUser", (id, options = {}) => {
  return cy.request({ method: "GET", url: `/users/${id}`, ...options });
});

Cypress.Commands.add("createUser", (user) => {
  return cy.request({ method: "POST", url: "/users", body: user });
});

Cypress.Commands.add("updateUser", (id, { firstName, surName }) => {
  return cy.request({
    method: "PUT",
    url: `/users/${id}`,
    qs: { firstName, surName },
  });
});

Cypress.Commands.add("deleteUser", (id) => {
  return cy.request({ method: "DELETE", url: `/users/${id}` });
});