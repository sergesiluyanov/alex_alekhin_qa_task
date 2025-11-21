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

// block analytics
Cypress.Commands.add('blockAnalytics', () => {
  // block Sentry
  cy.intercept({ method: 'GET', url: '**/sentry.io/**' }, { statusCode: 200, body: {} }).as('sentry')
  cy.intercept({ method: 'POST', url: '**/sentry.io/**' }, { statusCode: 200, body: {} }).as('sentryPost')
  
  // block Segment
  cy.intercept({ method: 'GET', url: '**/cdn.segment.com/**' }, { statusCode: 200, body: {} }).as('segment')
  cy.intercept({ method: 'POST', url: '**/cdn.segment.com/**' }, { statusCode: 200, body: {} }).as('segmentPost')
  
  // block CookiePro
  cy.intercept({ method: 'GET', url: '**/cookie-cdn.cookiepro.com/**' }, { statusCode: 200, body: {} }).as('cookiepro')
  cy.intercept({ method: 'POST', url: '**/cookie-cdn.cookiepro.com/**' }, { statusCode: 200, body: {} }).as('cookieproPost')
  
  // block Google Analytics / Tag Manager
  cy.intercept({ method: 'GET', url: '**/google.com/ccm/**' }, { statusCode: 200, body: {} }).as('googleAnalytics')
  cy.intercept({ method: 'POST', url: '**/google.com/ccm/**' }, { statusCode: 200, body: {} }).as('googleAnalyticsPost')
  cy.intercept({ method: 'GET', url: '**/www.google.com/ccm/**' }, { statusCode: 200, body: {} }).as('googleAnalyticsWWW')
  cy.intercept({ method: 'POST', url: '**/www.google.com/ccm/**' }, { statusCode: 200, body: {} }).as('googleAnalyticsWWWPost')
  
  // block GrowthBook
  cy.intercept({ method: 'GET', url: '**/cdn.growthbook.io/**' }, { statusCode: 200, body: {} }).as('growthbook')
  cy.intercept({ method: 'POST', url: '**/cdn.growthbook.io/**' }, { statusCode: 200, body: {} }).as('growthbookPost')
  // Также блокируем конкретно /api endpoint
  cy.intercept({ method: 'GET', url: '**/cdn.growthbook.io/api/**' }, { statusCode: 200, body: {} }).as('growthbookApi')
  cy.intercept({ method: 'POST', url: '**/cdn.growthbook.io/api/**' }, { statusCode: 200, body: {} }).as('growthbookApiPost')
  
  // block Microsoft Clarity
  cy.intercept({ method: 'GET', url: '**/b.clarity.ms/**' }, { statusCode: 200, body: {} }).as('clarity')
  cy.intercept({ method: 'POST', url: '**/b.clarity.ms/**' }, { statusCode: 200, body: {} }).as('clarityPost')
  cy.intercept({ method: 'HEAD', url: '**/b.clarity.ms/**' }, { statusCode: 200, body: {} }).as('clarityHead')
  
  // block other analytics
  cy.intercept({ method: 'GET', url: '**/analytics/**' }, { statusCode: 200, body: {} }).as('analytics')
  cy.intercept({ method: 'POST', url: '**/analytics/**' }, { statusCode: 200, body: {} }).as('analyticsPost')
})

// Login to Apify Console with session saving
Cypress.Commands.add('loginToConsole', (email, password) => {
  const loginEmail = email || Cypress.env('APIFY_EMAIL')
  const loginPassword = password || Cypress.env('APIFY_PASSWORD')
  
  if (!loginEmail || !loginPassword) {
    throw new Error('Email and password are required. Set APIFY_EMAIL and APIFY_PASSWORD in .env file or pass as parameters.')
  }
  
  // use cy.session() to save login state
  // session will be reused between tests
  cy.session(
    'apify-console-login',
    () => {
      // perform login only if session does not exist
      // Используем onLoad callback чтобы не ждать полной загрузки всех ресурсов
      cy.visit('https://console.apify.com/', {
        timeout: 60000,
        onBeforeLoad: (win) => {
          // Можно добавить логику перед загрузкой
        },
        onLoad: (win) => {
          // Страница загружена, но не ждем всех ресурсов
        }
      })
      
      // Ждем появления body вместо полной загрузки
      cy.get('body', { timeout: 30000 }).should('be.visible')
      
      // check if user is already logged in
      cy.url().then((url) => {
        if (!url.includes('/login') && !url.includes('/sign-in')) {
          // check for user elements
          cy.get('body').then(($body) => {
            if ($body.find('[data-test="user-menu"], [data-test="profile-button"]').length > 0) {
              // already logged in, skip
              return
            }
          })
        }
      })
      
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
      cy.url().should('not.include', '/login')
      cy.url().should('not.include', '/sign-in')
    },
    {
      validate: () => {
          // check if session is still valid
        cy.visit('https://console.apify.com/')
        cy.url().should('include', 'console.apify.com')
        cy.url().should('not.include', '/login')
        cy.url().should('not.include', '/sign-in')
      }
    }
  )
})

