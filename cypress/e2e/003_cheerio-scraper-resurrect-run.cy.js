import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // block analytics requests for faster tests
    cy.blockAllRequests()
    
    // login to console (session is saved and reused)
    cy.loginToConsole()
  })

  it('should search, configure, run, abort and resurrect Cheerio Scraper', () => {
    // Search for actor on Public Website
    PublicWebsitePage
      .visit()
      .searchForActor()
      .openActor()
      .openInConsole()
    
    // Apify Console
    ConsolePage
      .waitForConfiguration()
      .openAdvancedConfiguration()
      .setMaxPagesPerCrawl() // Generates random value and saves to fixture file
      .saveAndStartActor()
      .abortRun()
      .verifyAbortConfirmation()
      .verifyAbortMessage()
      .openActionsMenu()
      .selectResurrect()
      .confirmResurrect()
      .waitForActorToComplete()
      .exportResults()
      .downloadResults()
      .verifyDownloadedItemsCount()
  })
})

