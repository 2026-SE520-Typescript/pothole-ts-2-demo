import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  allowCypressEnv: false,
  trashAssetsBeforeRuns: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  allowCypressEnv: true,
  env: {
    ...process.env,
  },
});
