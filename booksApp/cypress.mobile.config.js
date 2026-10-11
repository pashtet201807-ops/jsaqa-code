const { defineConfig } = require("cypress");
const laptopConfig = require("./cypress.config.js");

module.exports = defineConfig({
  ...laptopConfig,
  viewportWidth: 414,
  viewportHeight: 896,
});