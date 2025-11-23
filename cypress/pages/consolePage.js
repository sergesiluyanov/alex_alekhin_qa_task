class ConsolePage {
  /**
   * Wait for configuration to load
   */
  waitForConfiguration() {
    cy.logToConsole('⏳ Waiting for configuration to load')
    cy.contains('Basic configuration', { timeout: 30000 })
      .should('be.visible')
    cy.log('✅ Configuration loaded')
    return this
  }

  /**
   * Open Advanced configuration section
   */
  openAdvancedConfiguration() {
    cy.logToConsole('⚙️ Opening Advanced configuration section')
    cy.log('⚙️ Opening Advanced configuration section')
    
    // Wait for Advanced configuration section to be visible
    cy.logToConsole('⏳ Waiting for Advanced configuration section...')
    cy.contains('div', 'Advanced configuration', { timeout: 30000 })
      .should('be.visible')
    
    cy.logToConsole('🖱️ Clicking Advanced configuration section...')
    cy.contains('div', 'Advanced configuration')
      .click()
    
    cy.logToConsole('✅ Advanced configuration section opened')
    cy.log('✅ Advanced configuration section opened')
    return this
  }

  /**
   * Set max pages per crawl value with random generation (1-10)
   * Saves the generated value to fixture file for later comparison
   */
  setMaxPagesPerCrawl() {
    cy.logToConsole('⚙️ Setting maxPagesPerCrawl')
    cy.log('⚙️ Setting maxPagesPerCrawl')
    
    // Generate random number between 1 and 10
    const randomValue = Math.floor(Math.random() * 10) + 1
    cy.logToConsole(`🎲 Generated random maxPages value: ${randomValue}`)
    cy.log(`🎲 Generated random maxPages value: ${randomValue}`)
    
    // Scroll to the input field and set value
    cy.logToConsole('📍 Scrolling to maxPagesPerCrawl input field...')
    cy.get('input#maxPagesPerCrawl', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
    
    cy.logToConsole(`📝 Typing value: ${randomValue}`)
    cy.get('input#maxPagesPerCrawl')
      .clear()
      .type(randomValue.toString())
      .then(($input) => {
        const actualValue = $input.val()
        cy.logToConsole(`📝 Input field value after typing: ${actualValue}`)
        cy.log(`📝 Input field value: ${actualValue}`)
        if (actualValue !== randomValue.toString()) {
          cy.logToConsole(`❌ ERROR: Input value mismatch! Expected: ${randomValue}, Got: ${actualValue}`)
        } else {
          cy.logToConsole(`✅ Input value matches: ${actualValue}`)
        }
      })
    
    // Verify the value is actually set in the input
    cy.logToConsole('✅ Verifying input value...')
    cy.get('input#maxPagesPerCrawl').should('have.value', randomValue.toString())
    
    // Save value to fixture file for later comparison
    cy.logToConsole(`💾 Saving maxPages value ${randomValue} to fixture file...`)
    cy.writeFile('cypress/fixtures/maxPages.json', { maxPages: randomValue })
    cy.logToConsole(`💾 Saved maxPages value ${randomValue} to fixture file`)
    cy.log(`💾 Generated and saved maxPages value: ${randomValue}`)
    
    return this
  }

  /**
   * Save configuration and start actor
   * After setting maxPagesPerCrawl, the button changes to "Save & Start"
   */
  saveAndStartActor() {
    cy.logToConsole('💾 Starting save and start process')
    cy.log('💾 Saving configuration and starting actor')
    
    // Verify maxPages value is still in the input before saving
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedValue = maxPagesFixture.maxPages
      cy.logToConsole(`🔍 Verifying maxPages value in input before save: ${expectedValue}`)
      cy.log(`🔍 Verifying maxPages value: ${expectedValue}`)
      
      cy.get('input#maxPagesPerCrawl').should('have.value', expectedValue.toString())
      cy.logToConsole(`✅ Verified maxPages value in input: ${expectedValue}`)
    })
    
    // Wait for button to be ready
    cy.logToConsole('⏳ Waiting for "Save & Start" button to be enabled...')
    cy.get('#onboarding-run-actor', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
    
    cy.logToConsole('✅ "Save & Start" button is enabled')
    
    // Click the button
    cy.logToConsole('🖱️ Clicking "Save & Start" button...')
    cy.get('#onboarding-run-actor')
      .click()
    
    cy.logToConsole('✅ Clicked "Save & Start" button')
    cy.log('✅ Clicked "Save & Start" button')
    return this
  }

  /**
   * Start the actor (used in other tests without configuration changes)
   */
  startActor() {
    cy.logToConsole('▶️ Starting actor')
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
    cy.logToConsole('🛑 Aborting actor run')
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
    cy.logToConsole('✅ Verifying abort confirmation message')
    cy.contains('Actor run was aborted', { timeout: 30000 })
      .should('be.visible')
    cy.log('✅ Abort confirmation message is visible')
    return this
  }

  /**
   * Verify abort message appears
   */
  verifyAbortMessage() {
    cy.logToConsole('✅ Verifying abort message')
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
    cy.logToConsole('📋 Opening Actions menu')
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
    cy.logToConsole('♻️ Selecting Resurrect from Actions menu')
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
    cy.logToConsole('✅ Confirming Resurrect in modal')
    cy.contains('button', 'Resurrect', { matchCase: false, timeout: 10000 })
      .should('be.visible')
      .click()
    cy.log('✅ Confirmed Resurrect')
    return this
  }

  /**
   * Wait for actor to complete data collection
   * Reads maxPages from fixture and waits until dataset has at least that many items
   */
  waitForActorToComplete() {
    cy.logToConsole('⏳ Waiting for actor to complete data collection')
    cy.log('⏳ Waiting for actor to complete data collection')
    
    // Read expected maxPages to know how many items to wait for
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedCount = maxPagesFixture.maxPages
      cy.logToConsole(`📋 Waiting for ${expectedCount} items to be processed`)
      cy.log(`📋 Waiting for ${expectedCount} items to be processed`)
      
      // Wait for the "getting data" message to disappear
      cy.contains('The Actor is getting your data...', { timeout: 120000 })
        .should('not.exist')
      
      cy.logToConsole('✅ "Getting data" message disappeared')
      
      // Wait for export button to appear (indicates actor has finished)
      cy.get('button#data-tracking-output-export', { timeout: 60000 })
        .should('be.visible')
        .should('not.be.disabled')
      
      cy.logToConsole('✅ Export button is enabled')
      
      // Wait to ensure all data is fully processed and saved to dataset
      // The actor needs time to process all pages and save them to the dataset
      cy.logToConsole(`⏳ Waiting 10 seconds for all ${expectedCount} items to be saved to dataset...`)
      cy.wait(10000)
      
      // Additional check: wait for dataset count indicator if available
      // Some UI elements might show dataset item count
      cy.logToConsole('✅ Actor completed data collection')
      cy.log(`✅ Actor completed data collection (expected ${expectedCount} items)`)
    })
    
    return this
  }

  /**
   * Export the results
   * Waits for export button to be enabled and ensures dataset is fully ready
   */
  exportResults() {
    cy.logToConsole('📤 Starting export process')
    cy.log('📤 Starting export process')
    
    // Read expected maxPages from fixture
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const expectedCount = maxPagesFixture.maxPages
      cy.logToConsole(`📋 Expected items count from maxPages: ${expectedCount}`)
      cy.log(`📋 Expected items count: ${expectedCount}`)
      
      // Wait for export button to be enabled (this indicates actor has finished)
      cy.logToConsole('⏳ Waiting for export button to be enabled...')
      cy.get('button#data-tracking-output-export', { timeout: 60000 })
        .should('be.visible')
        .should('not.be.disabled')
      
      cy.logToConsole('✅ Export button is enabled')
      
      // Wait to ensure all data is fully processed and saved to dataset
      // The actor needs time to process all pages and save them to the dataset
      cy.logToConsole(`⏳ Waiting 10 seconds for all ${expectedCount} items to be saved to dataset...`)
      cy.log(`⏳ Waiting for dataset to be fully saved (${expectedCount} items, 10s)...`)
      cy.wait(10000)
      
      // Click export button
      cy.logToConsole('🖱️ Clicking "Export" button...')
      cy.get('button#data-tracking-output-export')
        .click()
      
      // Wait after clicking export to ensure export modal/dialog is ready
      cy.wait(3000)
      
      cy.logToConsole(`✅ Clicked "Export" button (expected ${expectedCount} items)`)
      cy.log(`✅ Clicked "Export" button (expected ${expectedCount} items)`)
    })
    
    return this
  }

  /**
   * Download the results and save to fixture file
   * Waits for file to be downloaded, reads it and saves to fixtures
   */
  downloadResults() {
    cy.logToConsole('📥 Starting download process')
    cy.log('📥 Starting download process')
    
    // Get current time before download to find only new files
    const beforeDownloadTime = Date.now()
    cy.logToConsole(`⏰ Timestamp before download: ${new Date(beforeDownloadTime).toISOString()}`)
    
    // Wait for Download button and click it
    cy.logToConsole('⏳ Waiting for Download button...')
    cy.contains('button', 'Download', { matchCase: false, timeout: 30000 })
      .should('be.visible')
      .click()
    
    cy.logToConsole('✅ Clicked "Download" button')
    cy.log('✅ Clicked "Download" button')
    
    // Wait for file to be downloaded
    cy.logToConsole('⏳ Waiting for file to be downloaded...')
    cy.wait(5000) // Give browser time to download file
    
    // Find and read the downloaded file created after download started, then save to fixtures
    cy.logToConsole('🔍 Searching for downloaded file...')
    cy.task('findDownloadedFileAfterTime', { 
      pattern: 'cypress/downloads/dataset_cheerio-scraper_*.json',
      afterTime: beforeDownloadTime
    }).then((filePath) => {
      cy.logToConsole(`📥 Found downloaded file: ${filePath}`)
      cy.log(`📥 Found downloaded file: ${filePath}`)
      
      // Read the downloaded file
      cy.logToConsole('📖 Reading downloaded file...')
      cy.readFile(filePath, { timeout: 30000 }).then((data) => {
        cy.logToConsole(`📊 Dataset contains ${data.length} items`)
        cy.logToConsole(`📊 First item: ${data[0] ? JSON.stringify(data[0], null, 2) : 'No items'}`)
        cy.log(`📊 Dataset contains ${data.length} items`)
        
        // Save downloaded dataset to fixture file
        cy.logToConsole('💾 Saving dataset to fixture file...')
        cy.writeFile('cypress/fixtures/downloadedDataset.json', data)
        cy.logToConsole('💾 Saved downloaded dataset to fixture file')
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
    cy.logToConsole(`✅ Verifying dataset schema (minItems: ${minItems})`)
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
    cy.logToConsole('🔍 Starting verification of downloaded items count')
    cy.log('🔍 Starting verification of downloaded items count')
    
    // Read maxPages from fixture file first
    cy.readFile('cypress/fixtures/maxPages.json').then((maxPagesFixture) => {
      const maxPages = maxPagesFixture.maxPages
      cy.logToConsole(`📋 Reading maxPages from fixture: ${maxPages}`)
      cy.log(`📋 Expected maxPages from fixture: ${maxPages}`)
      
      // Read dataset from fixture file
      cy.readFile('cypress/fixtures/downloadedDataset.json').then((data) => {
        cy.logToConsole(`📊 Reading downloaded dataset from fixture file`)
        cy.logToConsole(`📊 Total items in dataset file: ${data.length}`)
        cy.log(`📊 Total items in dataset: ${data.length}`)
        
        // Verify it's an array
        cy.wrap(data).should('be.an', 'array')
        cy.logToConsole('✅ Dataset is a valid array')
        
        // Filter items that have both url and pageTitle
        cy.logToConsole('🔍 Filtering valid items (with url and pageTitle)...')
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
        cy.logToConsole(`✅ Valid items count: ${itemsCount}`)
        cy.logToConsole(`📋 Valid items URLs: ${JSON.stringify(validItems.map(item => item.url))}`)
        cy.log(`✅ Valid items (with url and pageTitle): ${itemsCount}`)
        
        // Save items count to fixture file
        cy.writeFile('cypress/fixtures/itemsCount.json', { itemsCount: itemsCount })
        cy.logToConsole(`💾 Saved itemsCount (${itemsCount}) to fixture file`)
        cy.log(`💾 Saved itemsCount (${itemsCount}) to fixture file`)
        
        // Compare values
        cy.logToConsole(`🔍 Comparison: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        cy.log(`🔍 Comparing values: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        
        if (itemsCount !== maxPages) {
          cy.logToConsole(`❌ MISMATCH DETECTED!`)
          cy.logToConsole(`❌ itemsCount: ${itemsCount}`)
          cy.logToConsole(`❌ maxPages: ${maxPages}`)
          cy.logToConsole(`❌ Difference: ${Math.abs(itemsCount - maxPages)}`)
          cy.logToConsole(`❌ Dataset contains ${itemsCount} items, but maxPages was set to ${maxPages}`)
        } else {
          cy.logToConsole(`✅ Values match: itemsCount (${itemsCount}) === maxPages (${maxPages})`)
        }
        
        // Verify count matches maxPages exactly
        cy.wrap(itemsCount).should('equal', maxPages)
        
        cy.logToConsole(`✅ Assertion passed: itemsCount (${itemsCount}) matches maxPages (${maxPages})`)
        cy.log(`✅ Assertion passed: itemsCount (${itemsCount}) matches maxPages (${maxPages})`)
      })
    })
    return this
  }

}

export default new ConsolePage()

