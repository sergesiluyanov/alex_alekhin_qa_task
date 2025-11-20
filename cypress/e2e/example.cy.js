// Пример базового теста без использования Page Object
// Для сравнения с подходом Page Object

describe('Example Test Suite', () => {
  it('should visit example page', () => {
    cy.visit('/')
    cy.contains('Welcome')
  })

  it('should interact with elements', () => {
    cy.visit('/')
    cy.get('button').click()
    cy.get('.result').should('be.visible')
  })
})

