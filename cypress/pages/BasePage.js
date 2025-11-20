/**
 * Базовый класс для всех Page Object
 * Содержит общие методы, которые могут использоваться на всех страницах
 */
class BasePage {
  /**
   * Открыть страницу по URL
   * @param {string} path - путь относительно baseUrl
   */
  visit(path = '') {
    cy.visit(path)
    return this
  }

  /**
   * Получить элемент по селектору
   * @param {string} selector - CSS селектор
   * @returns {Cypress.Chainable}
   */
  getElement(selector) {
    return cy.get(selector)
  }

  /**
   * Кликнуть по элементу
   * @param {string} selector - CSS селектор
   */
  click(selector) {
    cy.get(selector).click()
    return this
  }

  /**
   * Ввести текст в поле
   * @param {string} selector - CSS селектор
   * @param {string} text - текст для ввода
   */
  type(selector, text) {
    cy.get(selector).clear().type(text)
    return this
  }

  /**
   * Проверить видимость элемента
   * @param {string} selector - CSS селектор
   */
  shouldBeVisible(selector) {
    cy.get(selector).should('be.visible')
    return this
  }

  /**
   * Проверить, что элемент содержит текст
   * @param {string} selector - CSS селектор
   * @param {string} text - ожидаемый текст
   */
  shouldContainText(selector, text) {
    cy.get(selector).should('contain', text)
    return this
  }

  /**
   * Проверить URL
   * @param {string} url - ожидаемый URL
   */
  shouldHaveUrl(url) {
    cy.url().should('include', url)
    return this
  }

  /**
   * Ожидание загрузки элемента
   * @param {string} selector - CSS селектор
   * @param {number} timeout - таймаут в миллисекундах
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible')
    return this
  }

  /**
   * Скролл к элементу
   * @param {string} selector - CSS селектор
   */
  scrollToElement(selector) {
    cy.get(selector).scrollIntoView()
    return this
  }

  /**
   * Получить текст элемента
   * @param {string} selector - CSS селектор
   * @returns {Cypress.Chainable}
   */
  getText(selector) {
    return cy.get(selector).invoke('text')
  }

  /**
   * Проверить, что элемент существует
   * @param {string} selector - CSS селектор
   */
  shouldExist(selector) {
    cy.get(selector).should('exist')
    return this
  }

  /**
   * Проверить, что элемент не существует
   * @param {string} selector - CSS селектор
   */
  shouldNotExist(selector) {
    cy.get(selector).should('not.exist')
    return this
  }
}

export default BasePage

