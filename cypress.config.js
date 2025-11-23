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
    retries: {
      runMode: 2, // Retry failed tests 2 times in headless mode (CI/CD)
      openMode: 2 // Retry failed tests 2 times in interactive mode
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    // Important: Cypress can work with redirects between domains
    // When directly transitioning between different domains, chromeWebSecurity: false may be required
    // But in our case the transition happens through a redirect, so it should work
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      // load environment variables from .env file
      require('dotenv').config()
      
      // pass env variables to Cypress
      config.env.APIFY_EMAIL = process.env.APIFY_EMAIL
      config.env.APIFY_PASSWORD = process.env.APIFY_PASSWORD
      
      // Task to find downloaded file
      const fs = require('fs')
      const path = require('path')
      
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        findDownloadedFileAfterTime({ pattern, afterTime }) {
          const downloadsDir = path.join(process.cwd(), 'cypress', 'downloads')
          
          // check if the directory exists
          if (!fs.existsSync(downloadsDir)) {
            throw new Error(`Downloads directory does not exist: ${downloadsDir}`)
          }
          
          // read all files in the directory and filter by pattern
          const allFiles = fs.readdirSync(downloadsDir)
            .filter(file => file.startsWith('dataset_cheerio-scraper_') && file.endsWith('.json'))
            .map(file => path.join(downloadsDir, file))
          
          if (allFiles.length === 0) {
            throw new Error('No dataset files found in downloads directory')
          }
          
          // filter files created after the specified time
          const filesAfterTime = allFiles
            .map(file => {
              const stats = fs.statSync(file)
              return { file, mtime: stats.mtime, mtimeMs: stats.mtime.getTime() }
            })
            .filter(({ mtimeMs }) => mtimeMs >= afterTime)
          
          if (filesAfterTime.length === 0) {
            // if there are no files after the specified time, return the latest file from all files
            const sortedFiles = allFiles
              .map(file => ({ file, mtime: fs.statSync(file).mtime }))
              .sort((a, b) => b.mtime - a.mtime)
            return sortedFiles[0].file
          }
          
          // return the latest file from the files created after the specified time
          const sortedFiles = filesAfterTime.sort((a, b) => b.mtimeMs - a.mtimeMs)
          return sortedFiles[0].file
        }
      })
      
      return config
    },
  },
})

