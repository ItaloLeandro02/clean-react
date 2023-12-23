import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: 'src/main/test/cypress/fixtures',
    supportFile: 'src/main/test/cypress/support/commands.js',
    specPattern: 'src/main/test/cypress/integration',
    experimentalRunAllSpecs: true
  },
});
