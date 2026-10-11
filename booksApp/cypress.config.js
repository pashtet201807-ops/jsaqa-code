const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1536,
  viewportHeight: 864,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});