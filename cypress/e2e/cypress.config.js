import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "8guzcd",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    e2e: {
      baseUrl: "http://localhost:5173", // Убедись, что это URL твоего проекта
      supportFile: "cypress/support/e2e.js",
      fixturesFolder: "cypress/fixtures",
      specPattern: "cypress/e2e/**/*.cy.js",
      video: false, // Отключить запись видео, если не нужно
      screenshotsFolder: "cypress/screenshots"
    }
  },
});
