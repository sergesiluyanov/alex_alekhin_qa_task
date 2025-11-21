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

// Логин в Apify Console с сохранением сессии
Cypress.Commands.add('loginToConsole', (email, password) => {
  const loginEmail = email || Cypress.env('APIFY_EMAIL')
  const loginPassword = password || Cypress.env('APIFY_PASSWORD')
  
  if (!loginEmail || !loginPassword) {
    throw new Error('Email and password are required. Set APIFY_EMAIL and APIFY_PASSWORD in .env file or pass as parameters.')
  }
  
  // Используем cy.session() для сохранения состояния логина
  // Сессия будет переиспользоваться между тестами
  cy.session(
    'apify-console-login',
    () => {
      // Выполняем логин только если сессия не существует
      cy.visit('https://console.apify.com/')
      
      // Проверяем, не залогинены ли мы уже
      cy.url().then((url) => {
        if (!url.includes('/login') && !url.includes('/sign-in')) {
          // Возможно, уже залогинены - проверяем наличие элементов пользователя
          cy.get('body').then(($body) => {
            if ($body.find('[data-test="user-menu"], [data-test="profile-button"]').length > 0) {
              // Уже залогинены, пропускаем
              return
            }
          })
        }
      })
      
      // Шаг 1: Вводим email
      cy.get('input[data-test="email"], #email', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(loginEmail)
      
      // Шаг 2: Кликаем кнопку Next
      cy.get('button').contains('Next', { matchCase: false }).click()
      
      // Шаг 3: Вводим пароль (ждем появления поля)
      cy.get('input[data-test="password"], #password', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(loginPassword, { log: false })
      
      // Шаг 4: Кликаем кнопку Log in
      cy.get('button#data-tracking-sign-in-direct, button').contains('Log in', { matchCase: false }).click()
      
      // Ждем успешного логина - проверяем, что мы на странице консоли
      cy.url({ timeout: 15000 }).should('include', 'console.apify.com')
      cy.url().should('not.include', '/login')
      cy.url().should('not.include', '/sign-in')
    },
    {
      validate: () => {
        // Проверяем, что сессия еще валидна
        cy.visit('https://console.apify.com/')
        cy.url().should('include', 'console.apify.com')
        cy.url().should('not.include', '/login')
        cy.url().should('not.include', '/sign-in')
      }
    }
  )
})

