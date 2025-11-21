class ConsolePage {
  /**
   * Wait for configuration to load
   */
  waitForConfiguration() {
    cy.contains('Basic configuration', { timeout: 30000 })
      .should('be.visible')
    return this
  }

  /**
   * Start the actor
   */
  startActor() {
    cy.get('#onboarding-run-actor', { timeout: 10000 })
      .should('be.visible')
      .click()
    return this
  }

  /**
   * Wait for actor to complete data collection
   */
  waitForActorToComplete() {
    cy.contains('The Actor is getting your data...', { timeout: 120000 })
      .should('not.exist')
    return this
  }

  /**
   * Export the results
   */
  exportResults() {
    cy.get('button#data-tracking-output-export', { timeout: 60000 })
      .should('be.visible')
      .should('not.be.disabled')
      .click()
    return this
  }

  /**
   * Download the results
   */
  downloadResults() {
    cy.contains('button', 'Download', { matchCase: false, timeout: 30000 })
      .should('be.visible')
      .click()
    return this
  }

  /**
   * Verify downloaded dataset schema
   * Checks that the downloaded JSON file matches the expected schema
   */
  verifyDatasetSchema() {
    // Read the downloaded file using custom command
    cy.readDownloadedDataset().then((data) => {
      // Verify it's an array
      expect(data).to.be.an('array')
      expect(data.length).to.be.greaterThan(0)

      // Verify schema for each item
      data.forEach((item, index) => {
        expect(item, `Item ${index} should have url`).to.have.property('url')
        expect(item, `Item ${index} should have pageTitle`).to.have.property('pageTitle')
        expect(item.url, `Item ${index} url should be a string`).to.be.a('string')
        expect(item.pageTitle, `Item ${index} pageTitle should be a string`).to.be.a('string')
        expect(item.url, `Item ${index} url should not be empty`).to.not.be.empty
        expect(item.pageTitle, `Item ${index} pageTitle should not be empty`).to.not.be.empty
      })
    })
    return this
  }

}

export default new ConsolePage()

