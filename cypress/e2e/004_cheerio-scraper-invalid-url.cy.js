import PublicWebsitePage from '../pages/publicWebsite'
import ConsolePage from '../pages/consolePage'

describe('Cheerio Scraper E2E Flow', () => {
  beforeEach(() => {
    // block analytics requests for faster tests
    cy.blockAllRequests()
    
    // login to console (session is saved and reused)
    cy.loginToConsole()
  })

  it('should handle invalid URL and verify empty dataset message', () => {
    // Search for actor on Public Website
    PublicWebsitePage
      .visit()
      .searchForActor() // uses default: Cheerio Scraper Actor
      .openActor() // uses default: Cheerio Scraper
      .openInConsole() // redirect to console.apify.com
    
    // Apify Console
    ConsolePage
      .waitForConfiguration()
      .setUrl('https://invalid') // Set invalid URL
      .setGlob('https://invalid/*') // Set invalid Glob pattern
      .startActor() // Start the actor
      .verifyEmptyDatasetMessage() // Verify empty dataset message appears
      // Navigate back to actor input page to restore values
      .navigateToActorInput()
      // Restore original values
      .setUrl('https://crawlee.dev/js') // Restore original URL
      .setGlob('https://crawlee.dev/js/*/*') // Restore original Glob
      .saveConfiguration() // Save configuration
  })
})

