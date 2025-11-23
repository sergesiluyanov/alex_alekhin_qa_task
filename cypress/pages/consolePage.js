class ConsolePage {
  /**
   * Wait for configuration to load
   */
  waitForConfiguration() {
    console.log('⏳ Waiting for configuration to load')
    cy.contains('Basic configuration', { timeout: 30000 })
      .should('be.visible')
    cy.log('✅ Configuration loaded')
    return this
  }

  /**
   * Open Advanced configuration section
   */
  openAdvancedConfiguration() {
    console.log('⚙️ Opening Advanced configuration section')
    cy.log('⚙️ Opening Advanced configuration section')
    
    // Wait for Advanced configuration section to be visible
    console.log('⏳ Waiting for Advanced configuration section...')
    cy.contains('div', 'Advanced configuration', { timeout: 30000 })
      .should('be.visible')
    
    console.log('🖱️ Clicking Advanced configuration section...')
    cy.contains('div', 'Advanced configuration')
      .click()
    
    console.log('✅ Advanced configuration section opened')
    cy.log('✅ Advanced configuration section opened')
    return this
  }

  /**
   * Set max pages per crawl value with random generation (1-10)
   * Saves the generated value to fixture file for later comparison
   */
  setMaxPagesPerCrawl() {
    console.log('⚙️ Setting maxPagesPerCrawl')
    cy.log('⚙️ Setting maxPagesPerCrawl')
    
    // Generate random number between 1 and 10
    const randomValue = Math.floor(Math.random() * 10) + 1
    console.log(`🎲 Generated random maxPages value: ${randomValue}`)
    cy.log(`🎲 Generated random maxPages value: ${randomValue}`)
    
    // Scroll to the input field and set value
    console.log('📍 Scrolling to maxPagesPerCrawl input field...')
    cy.get('input#maxPagesPerCrawl', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
    
    console.log(`📝 Typing value: ${randomValue}`)
    cy.get('input#maxPagesPerCrawl')
      .clear()
      .type(randomValue.toString())
      .then(($input) => {
        const actualValue = $input.val()
        console.log(`📝 Input field value after typing: ${actualValue}`)
        cy.log(`📝 Input field value: ${actualValue}`)
        if (actualValue !== randomValue.toString()) {
          console.error(`❌ ERROR: Input value mismatch! Expected: ${randomValue}, Got: ${actualValue}`)
        } else {
          console.log(`✅ Input value matches: ${actualValue}`)
        }
      })
    
    // Verify the value is actually set in the input
    console.log('✅ Verifying input value...')
    cy.get('input#maxPagesPerCrawl').should('have.value', randomValue.toString())
    
    // Save value to fixture file for later comparison
    console.log(`💾 Saving maxPages value ${randomValue} to fixture file...`)
    cy.writeFile('cypress/fixtures/maxPages.json', { maxPages: randomValue })
    console.log(`💾 Saved maxPages value ${randomValue} to fixture file`)
    cy.log(`💾 Generated and saved maxPages value: ${randomValue}`)
    
    return this
  }

  /**
   * Save configuration and start actor
   * After setting maxPagesPerCrawl, the button changes to "Save & Start"
   */
  saveAndStartActor() {
    console.log('💾 Starting save and start process')
    cy.log('💾 Saving configuration and starting actor')
    
    // Verify maxPages value is still in the input before saving
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedValue = maxPagesFixture.maxPages
      console.log(`🔍 Verifying maxPages value in input before save: ${expectedValue}`)
      cy.log(`🔍 Verifying maxPages value: ${expectedValue}`)
      
      cy.get('input#maxPagesPerCrawl').should('have.value', expectedValue.toString())
      console.log(`✅ Verified maxPages value in input: ${expectedValue}`)
    })
    
    // Wait for button to be ready
    console.log('⏳ Waiting for "Save & Start" button to be enabled...')
    cy.get('#onboarding-run-actor', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
    
    console.log('✅ "Save & Start" button is enabled')
    
    // Click the button
    console.log('🖱️ Clicking "Save & Start" button...')
    cy.get('#onboarding-run-actor')
      .click()
    
    console.log('✅ Clicked "Save & Start" button')
    cy.log('✅ Clicked "Save & Start" button')
    return this
  }

  /**
   * Start the actor (used in other tests without configuration changes)
   */
  startActor() {
    console.log('▶️ Starting actor')
    cy.get('#onboarding-run-actor', { timeout: 10000 })
      .should('be.visible')
      .click()
    cy.log('✅ Clicked "Start" button')
    return this
  }

  /**
   * Abort the running actor
   */
  abortRun() {
    console.log('🛑 Aborting actor run')
    cy.contains('button', 'Abort', { matchCase: false, timeout: 30000 })
      .should('be.visible')
      .click()
    cy.log('✅ Clicked "Abort" button')
    return this
  }

  /**
   * Verify abort confirmation message appears
   */
  verifyAbortConfirmation() {
    console.log('✅ Verifying abort confirmation message')
    cy.contains('Actor run was aborted', { timeout: 30000 })
      .should('be.visible')
    cy.log('✅ Abort confirmation message is visible')
    return this
  }

  /**
   * Verify abort message appears
   */
  verifyAbortMessage() {
    console.log('✅ Verifying abort message')
    cy.contains('No results', { timeout: 30000 })
      .should('be.visible')
    cy.contains('The Actor finished with no results. Check the log for more information.', { timeout: 30000 })
      .should('be.visible')
    cy.log('✅ Abort message is visible')
    return this
  }

  /**
   * Open Actions menu
   */
  openActionsMenu() {
    console.log('📋 Opening Actions menu')
    cy.get('button[data-test="actor-run-actions-button"]', { timeout: 30000 })
      .should('be.visible')
      .click()
    cy.log('✅ Actions menu opened')
    return this
  }

  /**
   * Select Resurrect from Actions menu
   */
  selectResurrect() {
    console.log('♻️ Selecting Resurrect from Actions menu')
    cy.contains('span', 'Resurrect', { timeout: 10000 })
      .should('be.visible')
      .click()
    cy.log('✅ Selected Resurrect')
    return this
  }

  /**
   * Confirm Resurrect in modal
   */
  confirmResurrect() {
    console.log('✅ Confirming Resurrect in modal')
    cy.contains('button', 'Resurrect', { matchCase: false, timeout: 10000 })
      .should('be.visible')
      .click()
    cy.log('✅ Confirmed Resurrect')
    return this
  }

  /**
   * Wait for data items to appear
   */
  waitForDataItems() {
    cy.get('[data-test*="item"], [data-test*="dataset"], [data-test*="result"]', { timeout: 60000 })
      .should('have.length.at.least', 1)
    return this
  }

  /**
   * Wait for actor to complete data collection
   * Reads maxPages from fixture and waits until dataset has at least that many items
   */
  waitForActorToComplete() {
    console.log('⏳ Waiting for actor to complete data collection')
    cy.log('⏳ Waiting for actor to complete data collection')
    
    // Read expected maxPages to know how many items to wait for
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedCount = maxPagesFixture.maxPages
      console.log(`📋 Waiting for ${expectedCount} items to be processed`)
      cy.log(`📋 Waiting for ${expectedCount} items to be processed`)
      
      // Wait for the "getting data" message to disappear
      cy.contains('The Actor is getting your data...', { timeout: 120000 })
        .should('not.exist')
      
      console.log('✅ "Getting data" message disappeared')
      
      // Wait for export button to appear (indicates actor has finished)
      cy.get('button#data-tracking-output-export', { timeout: 60000 })
        .should('be.visible')
        .should('not.be.disabled')
      
      console.log('✅ Export button is enabled')
      
      // Wait to ensure all data is fully processed and saved to dataset
      // The actor needs time to process all pages and save them to the dataset
      console.log(`⏳ Waiting 10 seconds for all ${expectedCount} items to be saved to dataset...`)
      cy.wait(10000)
      
      // Additional check: wait for dataset count indicator if available
      // Some UI elements might show dataset item count
      console.log('✅ Actor completed data collection')
      cy.log(`✅ Actor completed data collection (expected ${expectedCount} items)`)
    })
    
    return this
  }

  /**
   * Export the results
   * Waits for export button to be enabled and ensures dataset is fully ready
   */
  exportResults() {
    console.log('📤 Starting export process')
    cy.log('📤 Starting export process')
    
    // Read expected maxPages from fixture
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedCount = maxPagesFixture.maxPages
      console.log(`📋 Expected items count from maxPages: ${expectedCount}`)
      cy.log(`📋 Expected items count: ${expectedCount}`)
      
      // Wait for export button to be enabled (this indicates actor has finished)
      console.log('⏳ Waiting for export button to be enabled...')
      cy.get('button#data-tracking-output-export', { timeout: 60000 })
        .should('be.visible')
        .should('not.be.disabled')
      
      console.log('✅ Export button is enabled')
      
      // Wait to ensure all data is fully processed and saved to dataset
      // The actor needs time to process all pages and save them to the dataset
      console.log(`⏳ Waiting 10 seconds for all ${expectedCount} items to be saved to dataset...`)
      cy.log(`⏳ Waiting for dataset to be fully saved (${expectedCount} items, 10s)...`)
      cy.wait(10000)
      
      // Click export button
      console.log('🖱️ Clicking "Export" button...')
      cy.get('button#data-tracking-output-export')
        .click()
      
      // Wait after clicking export to ensure export modal/dialog is ready
      cy.wait(3000)
      
      console.log(`✅ Clicked "Export" button (expected ${expectedCount} items)`)
      cy.log(`✅ Clicked "Export" button (expected ${expectedCount} items)`)
    })
    
    return this
  }

  /**
   * Download the results and save to fixture file
   * Waits for file to be downloaded, reads it and saves to fixtures
   */
  downloadResults() {
    console.log('📥 Starting download process')
    cy.log('📥 Starting download process')
    
    // Get current time before download to find only new files
    const beforeDownloadTime = Date.now()
    console.log(`⏰ Timestamp before download: ${new Date(beforeDownloadTime).toISOString()}`)
    
    // Wait for Download button and click it
    console.log('⏳ Waiting for Download button...')
    cy.contains('button', 'Download', { matchCase: false, timeout: 30000 })
      .should('be.visible')
      .click()
    
    console.log('✅ Clicked "Download" button')
    cy.log('✅ Clicked "Download" button')
    
    // Wait for file to be downloaded
    console.log('⏳ Waiting for file to be downloaded...')
    cy.wait(5000) // Give browser time to download file
    
    // Find and read the downloaded file created after download started, then save to fixtures
    console.log('🔍 Searching for downloaded file...')
    cy.task('findDownloadedFileAfterTime', { 
      pattern: 'cypress/downloads/dataset_cheerio-scraper_*.json',
      afterTime: beforeDownloadTime
    }).then((filePath) => {
      console.log(`📥 Found downloaded file: ${filePath}`)
      cy.log(`📥 Found downloaded file: ${filePath}`)
      
      // Read the downloaded file
      console.log('📖 Reading downloaded file...')
      cy.readFile(filePath, { timeout: 30000 }).then((data) => {
        console.log(`📊 Dataset contains ${data.length} items`)
        console.log(`📊 First item:`, data[0] ? JSON.stringify(data[0], null, 2) : 'No items')
        cy.log(`📊 Dataset contains ${data.length} items`)
        
        // Save downloaded dataset to fixture file
        console.log('💾 Saving dataset to fixture file...')
        cy.writeFile('cypress/fixtures/downloadedDataset.json', data)
        console.log('💾 Saved downloaded dataset to fixture file')
        cy.log(`💾 Saved downloaded dataset to fixture file`)
      })
    })
    
    return this
  }

  /**
   * Verify that the run completes and returns dataset items on the page
   * Checks that results are visible and contain data
   * @param {number} minItems - Minimum number of items to verify (default: 1)
   */
  verifyDatasetSchema(minItems = 1) {
    console.log(`✅ Verifying dataset schema (minItems: ${minItems})`)
    // Wait for actor to complete first
    this.waitForActorToComplete()
    
    // Verify that results section is visible and contains data
    // Check for dataset items or results table/list
    cy.get('[data-test*="item"], [data-test*="dataset"], [data-test*="result"], [data-test*="output"], [data-test*="dataset-item"], table tbody tr, .dataset-item, .result-item', { timeout: 60000 })
      .should('be.visible')
      .should('have.length.at.least', minItems)
    
    // Verify that at least one item contains actual data (not empty)
    cy.get('[data-test*="item"], [data-test*="dataset"], [data-test*="result"], [data-test*="output"], [data-test*="dataset-item"], table tbody tr, .dataset-item, .result-item')
      .first()
      .should('be.visible')
      .should('not.be.empty')
    
    cy.log(`✅ Dataset schema verified (at least ${minItems} items)`)
    return this
  }

  /**
   * Verify that the number of downloaded data items matches maxPages value
   * Counts all items with url and pageTitle in the export
   * Reads dataset from fixture file, saves items count to fixture and compares with maxPages
   */
  verifyDownloadedItemsCount() {
    console.log('🔍 Starting verification of downloaded items count')
    cy.log('🔍 Starting verification of downloaded items count')
    
    // Read maxPages from fixture file first
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const maxPages = maxPagesFixture.maxPages
      console.log(`📋 Reading maxPages from fixture: ${maxPages}`)
      cy.log(`📋 Expected maxPages from fixture: ${maxPages}`)
      
      // Read dataset from fixture file
      cy.readFile('cypress/fixtures/downloadedDataset.json').then((data) => {
        console.log(`📊 Reading downloaded dataset from fixture file`)
        console.log(`📊 Total items in dataset file: ${data.length}`)
        cy.log(`📊 Total items in dataset: ${data.length}`)
        
        // Verify it's an array
        cy.wrap(data).should('be.an', 'array')
        console.log('✅ Dataset is a valid array')
        
        // Filter items that have both url and pageTitle
        console.log('🔍 Filtering valid items (with url and pageTitle)...')
        const validItems = data.filter(item => 
          item && 
          item.url && 
          typeof item.url === 'string' && 
          item.url.trim() !== '' &&
          item.pageTitle && 
          typeof item.pageTitle === 'string' && 
          item.pageTitle.trim() !== ''
        )
        
        const itemsCount = validItems.length
        console.log(`✅ Valid items count: ${itemsCount}`)
        console.log(`📋 Valid items URLs:`, validItems.map(item => item.url))
        cy.log(`✅ Valid items (with url and pageTitle): ${itemsCount}`)
        
        // Save items count to fixture file
        cy.writeFile('cypress/fixtures/itemsCount.json', { itemsCount: itemsCount })
        console.log(`💾 Saved itemsCount (${itemsCount}) to fixture file`)
        cy.log(`💾 Saved itemsCount (${itemsCount}) to fixture file`)
        
        // Compare values
        console.log(`🔍 Comparison: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        cy.log(`🔍 Comparing values: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        
        if (itemsCount !== maxPages) {
          console.error(`❌ MISMATCH DETECTED!`)
          console.error(`❌ itemsCount: ${itemsCount}`)
          console.error(`❌ maxPages: ${maxPages}`)
          console.error(`❌ Difference: ${Math.abs(itemsCount - maxPages)}`)
          console.error(`❌ Dataset contains ${itemsCount} items, but maxPages was set to ${maxPages}`)
        } else {
          console.log(`✅ Values match: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        }
        
        // Verify count matches maxPages exactly
        cy.wrap(itemsCount).should('equal', maxPages)
        
        console.log(`✅ Assertion passed: itemsCount (${itemsCount}) matches maxPages (${maxPages})`)
        cy.log(`✅ Assertion passed: itemsCount (${itemsCount}) matches maxPages (${maxPages})`)
      })
    })
    return this
  }

}

export default new ConsolePage()

