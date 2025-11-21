class ConsolePage {
  verifyOnConsolePage() {
    cy.url().should('include', 'console.apify.com')
    return this
  }

  /**
   * wait for page load
   */
  waitForPageLoad() {
    cy.url().should('include', 'console.apify.com')
    // Ждем загрузки основных элементов страницы
    cy.get('body').should('be.visible')
    return this
  }

  /**
   * Обновить input актора
   * @param {Object} inputData - объект с данными для input
   */
  updateActorInput(inputData) {
    // Пример: обновление startUrls для Cheerio Scraper
    // Нужно будет найти конкретные селекторы для input полей
    // cy.get('[data-test="input-field"]').clear().type(inputData.startUrls)
    
    // Для Cheerio Scraper обычно нужно обновить startUrls
    if (inputData.startUrls) {
      cy.get('textarea, input').contains('startUrls').parent().find('textarea, input').first()
        .clear().type(JSON.stringify(inputData.startUrls), { parseSpecialCharSequences: false })
    }
    
    // Можно добавить другие поля по необходимости
    return this
  }

  /**
   * Обновить минимальный input для теста (в пределах free лимитов)
   */
  setMinimalInput() {
    const minimalInput = {
      startUrls: ['https://crawlee.dev'],
      maxPagesPerCrawl: 3
    }
    this.updateActorInput(minimalInput)
    return this
  }

  /**
   * Запустить актора
   */
  runActor() {
    // Найти и кликнуть кнопку запуска
    cy.get('button').contains('Start', { matchCase: false }).click()
    // Или использовать data-test атрибут, если есть
    // cy.get('[data-test="start-actor-button"]').click()
    return this
  }

  /**
   * Дождаться завершения запуска актора
   */
  waitForRunToComplete(timeout = 120000) {
    // wait for status to change to success
    cy.contains('Succeeded', { timeout, matchCase: false }).should('be.visible')
    return this
  }

  /**
   * Verify dataset has items inside
   */
  verifyDatasetHasItems(minItems = 1) {
    // Открыть dataset, если нужно
    cy.contains('Dataset', { matchCase: false }).click()
    
    // Проверить наличие элементов в dataset
    cy.get('[data-test="dataset-item"], .dataset-item, tbody tr', { timeout: 10000 })
      .should('have.length.at.least', minItems)
    
    return this
  }

  /**
   * get dataset items count
   */
  getDatasetItemCount() {
    // Найти элемент с количеством items
    return cy.get('[data-test="dataset-count"], .dataset-count').invoke('text')
  }
}

export default new ConsolePage()

