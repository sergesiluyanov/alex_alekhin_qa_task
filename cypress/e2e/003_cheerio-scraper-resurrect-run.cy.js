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
      .startActor()
      .abortRun()
      .verifyAbortConfirmation()
      .verifyAbortMessage()
      .openActionsMenu()
      .selectResurrect()
      .confirmResurrect()
      .verifyDatasetSchema(1) // Verify at least 1 data item appears on the page
  })
})

