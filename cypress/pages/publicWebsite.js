class PublicWebsitePage {
  /**
   * Открыть главную страницу
   */
  visit() {
    cy.visit('https://apify.com/')
    return this
  }

  /**
   * Выполнить поиск актора
   * @param {string} actorName - название актора для поиска
   */
  searchForActor(actorName) {
    cy.get('[data-testid="react-typed"]').click()
    cy.get('input.HomepageHeroSection-input').clear().type(actorName)
    cy.get('button.HomepageHeroSection-searchButton').click()
    return this
  }

  /**
   * Открыть карточку актора из результатов поиска
   * @param {string} actorName - название актора
   */
  openActor(actorName) {
    cy.get('[data-test="actor-card"]').contains(actorName).first().click()
    return this
  }

  /**
   * Кликнуть на кнопку "Try for free" для открытия актора в консоли
   * После этого происходит редирект на console.apify.com
   */
  openInConsole() {
    cy.get('#actor-detail-try-for-free-button').click({force: true})
    // Явно ждем перехода на другой домен
    cy.url({ timeout: 10000 }).should('include', 'console.apify.com')
    return this
  }
}

export default new PublicWebsitePage();
