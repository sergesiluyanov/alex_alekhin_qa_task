import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // Блокируем аналитику для ускорения тестов
    cy.blockAnalytics()
  })

  it('should search, configure, run Cheerio Scraper and verify results', () => {
    const actorName = 'Cheerio Scraper Actor'
    
    // Search for actor on Public Website
    PublicWebsitePage
      .visit()
      .searchForActor(actorName)
      .openActorCard('Cheerio Scraper')
      .openInConsole() // Явный переход на console.apify.com
    
    // Apify Console 
    ConsolePage
      .waitForPageLoad()
      .verifyOnConsolePage()
      .setMinimalInput()      // Шаг 3: Обновляем input
      .runActor()             // Шаг 4: Запускаем актора
      .waitForRunToComplete() // Шаг 5: Ждем завершения
      .verifyDatasetHasItems(1) // Шаг 6: Проверяем результаты
  })
})

