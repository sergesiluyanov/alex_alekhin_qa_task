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

