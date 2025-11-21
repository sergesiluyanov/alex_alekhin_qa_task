// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command example
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { username, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token)
  })
})

// Type with delay (useful for slow typing simulation)
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  options = options || {}
  options.delay = options.delay || 0
  return originalFn(element, text, options)
})

Cypress.Commands.add('blockAllRequests', () => {
  cy.intercept('*', (req) => {
    const allowedDomains = ['https://console.apify.com/', 'https://apify.com/', 'https://console-backend.apify.com/public/authentication/resume', 'https://console-backend.apify.com/public/authentication/sign-up-options', 'https://console-backend.apify.com/public/authentication/login-with-password', 'https://cdn-cms.apify.com', 'https://ow0o5i3qo7-dsn.algolia.net', 'https://images.apifyusercontent.com', 'https://console-backend.apify.com/users/profile/me', 'https://console-backend.apify.com', 'https://cdn.apify.com', 'https://status.apify.com', 'https://api.apify.com', 'https://cdn.growthbook.io', 'https://o272833.ingest.us.sentry.io', 'https://cdn.growthbook.io/sub/', 'https://api.flows-cloud.com', 'https://cms.apify.com/api', 'https://cdn.jsdelivr.net'];

    if (!allowedDomains.some(domain => req.url.includes(domain))) {
      req.destroy();
    }
  });
});

// Read downloaded dataset file
Cypress.Commands.add('readDownloadedDataset', () => {
  return cy.task('findDownloadedFile', 'cypress/downloads/dataset_cheerio-scraper_*.json').then((filePath) => {
    return cy.readFile(filePath, { timeout: 30000 })
  })
})

// Login to Apify Console with session saving
Cypress.Commands.add('loginToConsole', (email, password) => {
  const loginEmail = email || Cypress.env('APIFY_EMAIL')
  const loginPassword = password || Cypress.env('APIFY_PASSWORD')
  
  if (!loginEmail || !loginPassword) {
    throw new Error('Email and password are required. Set APIFY_EMAIL and APIFY_PASSWORD in .env file or pass as parameters.')
  }
  
  // use cy.session() to save login state
  // Always perform login to ensure we're logged in (no validation to avoid logout issues)
  cy.session(
    'apify-console-login',
    () => {
      // Always visit sign-in page and perform login
      cy.visit('https://console.apify.com/sign-in', {
        timeout: 60000
      })
      
      // Wait for page to load
      cy.get('body', { timeout: 30000 }).should('be.visible')
      
      // step 1: enter email
      cy.get('input[data-test="email"], #email', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(loginEmail)
      
      // step 2: click Next button
      cy.get('button').contains('Next', { matchCase: false }).click()
      
      // step 3: enter password (wait for field to appear)
      cy.get('input[data-test="password"], #password', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(loginPassword, { log: false })
      
      // step 4: click Log in button
      cy.get('button#data-tracking-sign-in-direct, button').contains('Log in', { matchCase: false }).click()
      
      // wait for successful login - check if we are on console page
      cy.url({ timeout: 15000 }).should('include', 'console.apify.com')
      cy.url().should('not.include', '/sign-in')
    }
    // login validation is not needed; login is always performed every time
  )
})

