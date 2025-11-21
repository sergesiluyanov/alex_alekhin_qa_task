import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

/**
 * End-to-End тест для Cheerio Scraper
 * 
 * Покрывает полный flow:
 * 1. Поиск актора на Public Website
 * 2. Открытие в Apify Console
 * 3. Обновление input
 * 4. Запуск актора
 * 5. Проверка результатов
 */
describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // Блокируем аналитику для ускорения тестов
    cy.blockAnalytics()
  })

  it('should search, configure, run Cheerio Scraper and verify results', () => {
    const actorName = 'Cheerio Scraper Actor'
    
    // Шаг 1: Поиск актора на Public Website
    PublicWebsitePage
      .visit()
      .searchForActor(actorName)
      .openActorCard('Cheerio Scraper')
      .openInConsole() // Явный переход на console.apify.com
    
    // Шаг 2: Работа в Apify Console
    ConsolePage
      .waitForPageLoad()
      .verifyOnConsolePage()
      .setMinimalInput()      // Шаг 3: Обновляем input
      .runActor()             // Шаг 4: Запускаем актора
      .waitForRunToComplete() // Шаг 5: Ждем завершения
      .verifyDatasetHasItems(1) // Шаг 6: Проверяем результаты
  })
})

