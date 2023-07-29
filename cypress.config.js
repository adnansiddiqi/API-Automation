const { defineConfig } = require("cypress");

module.exports = defineConfig({
  CYPRESS_NO_COLOR: true,
  projectId: "6h7a9i",
  e2e: {
    baseUrl: 'https://gorest.co.in',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },specPattern: 'cypress/e2e/API testing/*.{js,jsx,ts,tsx}'
  },
});
