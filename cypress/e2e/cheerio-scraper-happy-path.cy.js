import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // Блокируем аналитику для ускорения тестов
    cy.blockAllRequests()
    
    // Логинимся в консоль (сессия сохраняется и переиспользуется)
    cy.loginToConsole()
  })

  it('should search, configure, run Cheerio Scraper and verify results', () => {
    // Search for actor on Public Website
    PublicWebsitePage
      .visit()
      .searchForActor() // uses default: Cheerio Scraper Actor
      .openActor() // uses default: Cheerio Scraper
      .openInConsole() // redirect to console.apify.com
    
    // Apify Console
    ConsolePage
      .waitForConfiguration()
      .startActor()
      .waitForActorToComplete()
      .exportResults()
      .downloadResults()
      .verifyDatasetSchema() // Verify downloaded dataset schema
  })
})

