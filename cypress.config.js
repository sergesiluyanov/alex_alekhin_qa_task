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
      
      // Task для поиска скачанного файла
      const fs = require('fs')
      const path = require('path')
      
      on('task', {
        findDownloadedFile(pattern) {
          const downloadsDir = path.join(process.cwd(), 'cypress', 'downloads')
          
          // Проверяем существование директории
          if (!fs.existsSync(downloadsDir)) {
            throw new Error(`Downloads directory does not exist: ${downloadsDir}`)
          }
          
          // Читаем все файлы в директории и фильтруем по паттерну
          const files = fs.readdirSync(downloadsDir)
            .filter(file => file.startsWith('dataset_cheerio-scraper_') && file.endsWith('.json'))
            .map(file => path.join(downloadsDir, file))
          
          if (files.length === 0) {
            throw new Error('No dataset files found in downloads directory')
          }
          
          // Возвращаем самый новый файл
          const sortedFiles = files
            .map(file => ({ file, mtime: fs.statSync(file).mtime }))
            .sort((a, b) => b.mtime - a.mtime)
          
          return sortedFiles[0].file
        }
      })
      
      return config
    },
  },
})

