const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "qtwq8w",
  e2e: {
    baseUrl: "http://localhost:8080",
  },
});