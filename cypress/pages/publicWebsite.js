class PublicWebsitePage {

  searchForActor() {
    cy.visit('https://apify.com/')
    cy.get('[data-testid="react-typed"]').click()
    cy.get('[data-testid="react-typed"] input, [data-testid="react-typed"]').first().clear().type('Google Maps Scraper')

  }
}

export default PublicWebsitePage
