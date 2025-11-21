const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    // Важно: Cypress может работать с переходами между доменами через редирект
    // При прямом переходе между разными доменами может потребоваться chromeWebSecurity: false
    // Но в нашем случае переход происходит через редирект, поэтому должно работать
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      // Загружаем переменные окружения из .env файла
      require('dotenv').config()
      
      // Передаем env переменные в Cypress
      config.env.APIFY_EMAIL = process.env.APIFY_EMAIL
      config.env.APIFY_PASSWORD = process.env.APIFY_PASSWORD
      
      return config
    },
  },
})

