import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // Блокируем аналитику для ускорения тестов
    cy.blockAllRequests()
    
    // Логинимся в консоль (сессия сохраняется и переиспользуется)
    cy.loginToConsole()
  })

  it('should search, configure, run and abort Cheerio Scraper', () => {
    // Search for actor on Public Website
    PublicWebsitePage
      .visit()
      .searchForActor()
      .openActor()
      .openInConsole()
    
    // Apify Console
    ConsolePage
      .waitForConfiguration()
      .startActor()
      .abortRun()
      .verifyAbortConfirmation()
      .verifyAbortMessage()
  })
})

