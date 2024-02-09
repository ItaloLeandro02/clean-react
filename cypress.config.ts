import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: 'tests/e2e/cypress/fixtures',
    supportFile: 'tests/e2e/cypress/support/commands.js',
    specPattern: 'tests/e2e/cypress/integration',
    experimentalRunAllSpecs: true,
    video: false
  },
});
