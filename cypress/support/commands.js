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

// Блокировка аналитических запросов
Cypress.Commands.add('blockAnalytics', () => {
  // Блокировать Sentry
  cy.intercept('GET', '**/sentry.io/**', { statusCode: 200, body: {} }).as('sentry')
  cy.intercept('POST', '**/sentry.io/**', { statusCode: 200, body: {} }).as('sentryPost')
  
  // Блокировать Segment
  cy.intercept('GET', '**/cdn.segment.com/**', { statusCode: 200, body: {} }).as('segment')
  cy.intercept('POST', '**/cdn.segment.com/**', { statusCode: 200, body: {} }).as('segmentPost')
  
  // Блокировать CookiePro
  cy.intercept('GET', '**/cookie-cdn.cookiepro.com/**', { statusCode: 200, body: {} }).as('cookiepro')
  cy.intercept('POST', '**/cookie-cdn.cookiepro.com/**', { statusCode: 200, body: {} }).as('cookieproPost')
  
  // Блокировать другие аналитические сервисы
  cy.intercept('GET', '**/analytics/**', { statusCode: 200, body: {} }).as('analytics')
  cy.intercept('POST', '**/analytics/**', { statusCode: 200, body: {} }).as('analyticsPost')
})

