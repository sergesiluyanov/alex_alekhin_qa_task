class PublicWebsitePage {
  // Default actor name for Cheerio Scraper
  CHEERIO_SCRAPER_SEARCH = 'Cheerio Scraper Actor'
  CHEERIO_SCRAPER_NAME = 'Cheerio Scraper'

  visit() {
    cy.logToConsole('🌐 Visiting https://apify.com/')
    cy.visit('https://apify.com/')
    cy.log('✅ Visited https://apify.com/')
    return this
  }

  searchForActor() {
    cy.logToConsole(`🔍 Searching for actor: ${this.CHEERIO_SCRAPER_SEARCH}`)
    cy.get('[data-testid="react-typed"]').click()
    cy.get('input.HomepageHeroSection-input').clear().type(this.CHEERIO_SCRAPER_SEARCH)
    cy.get('button.HomepageHeroSection-searchButton').click()
    cy.log(`✅ Searched for actor: ${this.CHEERIO_SCRAPER_SEARCH}`)
    return this
  }

  openActor() {
    cy.logToConsole(`📂 Opening actor: ${this.CHEERIO_SCRAPER_NAME}`)
    cy.get('[data-test="actor-card"]').contains(this.CHEERIO_SCRAPER_NAME).first().click()
    cy.log(`✅ Opened actor: ${this.CHEERIO_SCRAPER_NAME}`)
    return this
  }

  openInConsole() {
    cy.logToConsole('🚀 Opening actor in console')
    cy.get('#actor-detail-try-for-free-button').click({force: true})
    // waiting for redirect to apify console
    cy.url({ timeout: 10000 }).should('include', 'console.apify.com')
    cy.log('✅ Redirected to console.apify.com')
    return this
  }
}

export default new PublicWebsitePage();
