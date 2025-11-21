class ConsolePage {
  /**
   * Проверить, что мы находимся на странице консоли
   */
  verifyOnConsolePage() {
    cy.url().should('include', 'console.apify.com')
    return this
  }

  /**
   * Дождаться загрузки страницы консоли
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
    // Ждем, пока статус изменится на SUCCEEDED или FAILED
    cy.contains('Succeeded', { timeout, matchCase: false }).should('be.visible')
    // Или можно использовать более специфичный селектор
    // cy.get('[data-test="run-status"]').should('contain', 'Succeeded')
    return this
  }

  /**
   * Проверить, что dataset содержит элементы
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
   * Получить количество элементов в dataset
   */
  getDatasetItemCount() {
    // Найти элемент с количеством items
    return cy.get('[data-test="dataset-count"], .dataset-count').invoke('text')
  }
}

export default new ConsolePage()

