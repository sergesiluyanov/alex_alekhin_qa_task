class PublicWebsitePage {
  // Default actor name for Cheerio Scraper
  CHEERIO_SCRAPER_SEARCH = 'Cheerio Scraper Actor'
  CHEERIO_SCRAPER_NAME = 'Cheerio Scraper'

  visit() {
    cy.visit('https://apify.com/')
    return this
  }

  searchForActor() {
    cy.get('[data-testid="react-typed"]').click()
    cy.get('input.HomepageHeroSection-input').clear().type(this.CHEERIO_SCRAPER_SEARCH)
    cy.get('button.HomepageHeroSection-searchButton').click()
    return this
  }

  openActor() {
    cy.get('[data-test="actor-card"]').contains(this.CHEERIO_SCRAPER_NAME).first().click()
    return this
  }
   
  openInConsole() {
    cy.get('#actor-detail-try-for-free-button').click({force: true})
    // waiting for redirect to apify console
    cy.url({ timeout: 10000 }).should('include', 'console.apify.com')
    return this
  }
}

export default new PublicWebsitePage();
