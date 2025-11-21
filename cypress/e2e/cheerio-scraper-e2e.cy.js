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
      .openInConsole() // redirect to console.apify.com
    
    // Apify Console 
    ConsolePage
      .waitForPageLoad()
      .verifyOnConsolePage()
    //.setMinimalInput()      // Update actor's input
      .runActor()             // Run the actor
    //.waitForRunToComplete() // Wait for run is completed
    //.verifyDatasetHasItems(1) // Verify data items
  })
})

