import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // block analytics requests for faster tests
    cy.blockAllRequests()
    
    // login to console (session is saved and reused)
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
      .openAdvancedConfiguration()
      .setMaxConcurrency(1) // Set maxConcurrency to 1 for valid results
      .setMaxPagesPerCrawl() // Generates random value and saves to fixture file
      .saveAndStartActor() // Click "Save & Start" button
      .waitForActorToComplete()
      .exportResults()
      .downloadResults()
      .verifyDownloadedItemsCount() // Reads maxPages from fixture and compares with latest downloaded file
  })
})

