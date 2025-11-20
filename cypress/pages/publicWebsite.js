class PublicWebsitePage {

  searchForActor() {
    cy.visit('https://apify.com/')
    cy.get('[data-testid="react-typed"]').click()
    cy.get('input.HomepageHeroSection-input').clear().type('Google Maps Scraper')
    cy.get('button.HomepageHeroSection-searchButton').click()
    return this
  }
}

export default new PublicWebsitePage();
