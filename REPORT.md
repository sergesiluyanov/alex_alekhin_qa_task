# Assignment Report

## Approach

This solution implements automated end-to-end tests for the Cheerio Scraper Actor using Cypress. The approach focuses on:

1. **Page Object Model (POM)**: All UI interactions are encapsulated in Page Object classes (`PublicWebsitePage` and `ConsolePage`) to ensure maintainability and reusability.

2. **Four Key User Flows**:
   - **Happy Path (001)**: Complete E2E flow from searching the actor to verifying downloaded results
   - **Aborting the Run (002)**: Edge case testing actor abort functionality
   - **Resurrect Run (003)**: Edge case testing actor resurrection after abort
   - **Invalid URL (004)**: Edge case testing invalid URL handling and empty dataset message

3. **Session Management**: Using `cy.session()` to cache login state and avoid repeated authentication across tests.

4. **Network Optimization**: Blocking analytics and external requests to speed up test execution and reduce flakiness.

5. **Data Verification**: Storing test data in fixtures and comparing expected vs actual results to ensure data integrity.

## Test Flows

### 1. Happy Path (001_cheerio-scraper-happy-path.cy.js)

**Flow**:
1. Search for "Cheerio Scraper Actor" on the Public Website
2. Open the actor card
3. Navigate to Apify Console
4. Wait for configuration to load
5. Open Advanced configuration section
6. Set `maxConcurrency` to 1 (for valid results)
7. Set `maxPagesPerCrawl` to a random value (1-10) and save to fixture
8. Save and start the actor
9. Wait for actor to complete
10. Export results
11. Download results
12. Verify that the number of downloaded items matches the configured `maxPagesPerCrawl` value

**Coverage**: This test covers the **required E2E flow** specified in the assignment.

### 2. Aborting the Run (002_cheerio-scraper-aborting-the-run.cy.js)

**Flow**:
1. Search and open Cheerio Scraper in Console
2. Start the actor (without configuration changes)
3. Abort the running actor
4. Verify abort confirmation message appears
5. Verify "No results" message appears

**Coverage**: verifies that aborting a run works correctly and shows appropriate messages.

### 3. Resurrect Run (003_cheerio-scraper-resurrect-run.cy.js)

**Flow**:
1. Search and open Cheerio Scraper in Console
2. Configure `maxPagesPerCrawl` with a random value
3. Save and start the actor
4. Abort the running actor
5. Verify abort messages
6. Open Actions menu
7. Select "Resurrect" option
8. Confirm resurrection in modal
9. Wait for actor to complete
10. Export and download results
11. Verify downloaded items count matches `maxPagesPerCrawl`

**Coverage**: verifies that resurrecting an aborted run works correctly and processes data.

### 4. Invalid URL (004_cheerio-scraper-invalid-url.cy.js)

**Flow**:
1. Search and open Cheerio Scraper in Console
2. Set invalid URL: `https://invalid`
3. Set invalid Glob pattern: `https://invalid/*`
4. Start the actor
5. Verify empty dataset message appears ("There are no items on this page")
6. Navigate back to actor input page
7. Restore original startUrl: `https://crawlee.dev/js`
8. Restore original URL: `https://crawlee.dev/js`
9. Restore original Glob: `https://crawlee.dev/js/*/*`
10. Save configuration

**Coverage**: verifies that invalid URLs are handled correctly and appropriate error messages are displayed. Also ensures test cleanup by restoring original values.

## Assumptions

1. **Test Account**: Using a personal Apify test account with free plan limits
2. **Credentials**: Stored in `.env` file (not committed to repository)
3. **Free Plan Limits**: 
   - `maxPagesPerCrawl` is set to random values between 1-10 to stay within free plan limits
   - `maxConcurrency` is set to 1 for valid results
4. **Actor Availability**: Cheerio Scraper Actor is available and accessible in the Apify Store
5. **Network Stability**: Tests assume stable network connection for reliable execution
6. **Browser**: Tests are designed to run in Electron (Cypress default) but can run in Chrome/Firefox/Edge

## Trade-offs

1. **Export Formats**: Only JSON export is implemented. CSV and XLSX exports are not covered due to time constraints, but the structure allows easy extension.

2. **Input Field Types**: Multiple input types are tested:
   - ✅ Numbers: `maxPagesPerCrawl`, `maxConcurrency`
   - ✅ URLs: `setUrl()`, `setStartUrl()`
   - ✅ Text/Patterns: `setGlob()`

3. **Edge Cases**: Comprehensive edge case coverage:
   - ✅ Abort functionality
   - ✅ Resurrect functionality
   - ✅ Invalid URL handling
   - ✅ Empty dataset message verification

4. **Wait Times**: Fixed 10-second waits are used instead of dynamic polling. This is a trade-off between test speed and reliability.

5. **Data Validation**: Schema validation is implemented but only checks for `url` and `pageTitle` fields. Full schema validation could be more comprehensive.

## Technical Decisions

1. **Page Object Model**: Chosen for maintainability and reusability. Methods return `this` to support method chaining.

2. **Session Management**: Using `cy.session()` to cache login state and avoid repeated authentication, improving test speed.

3. **Fixture Files**: Using Cypress fixtures to store and compare test data:
   - `maxPages.json`: Stores the configured `maxPagesPerCrawl` value
   - `downloadedDataset.json`: Stores the downloaded dataset
   - `itemsCount.json`: Stores the count of valid items

4. **Custom Commands**: 
   - `cy.loginToConsole()`: Handles authentication with session caching
   - `cy.blockAllRequests()`: Blocks analytics and external requests
   - `cy.logToConsole()`: Outputs logs to Node.js console for better visibility in headless mode

5. **Error Handling**: Uncaught exceptions are handled in `cypress/support/e2e.js` to prevent test failures from React errors.

6. **Logging**: Comprehensive logging using `cy.logToConsole()` for debugging and visibility in headless mode.

7. **Test Retries**: Configured 2 retries for each test (`retries: { runMode: 2, openMode: 2 }`) to improve stability and handle transient failures.

8. **Test Cleanup**: Test 004 includes cleanup steps to restore original configuration values after testing invalid inputs, ensuring tests don't affect each other.

## File Structure

```
cypress/
├── e2e/
│   ├── 001_cheerio-scraper-happy-path.cy.js
│   ├── 002_cheerio-scraper-aborting-the-run.cy.js
│   ├── 003_cheerio-scraper-resurrect-run.cy.js
│   └── 004_cheerio-scraper-invalid-url.cy.js
├── pages/
│   ├── publicWebsite.js      # Page Object for Apify Public Website
│   └── consolePage.js        # Page Object for Apify Console
├── support/
│   ├── commands.js           # Custom Cypress commands
│   └── e2e.js                # Global configuration and error handling
├── fixtures/
│   ├── maxPages.json         # Stores configured maxPagesPerCrawl value
│   ├── downloadedDataset.json # Stores downloaded dataset
│   └── itemsCount.json       # Stores count of valid items
└── downloads/                # Downloaded files (auto-generated)
```

## Running the Tests

### Prerequisites

1. **Node.js**: Version 14 or higher
2. **npm**: Installed with Node.js
3. **Apify Account**: Personal test account with credentials

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** in the project root:
   ```env
   APIFY_EMAIL=your-email@example.com
   APIFY_PASSWORD=your-password
   ```

3. **Verify `.env` is in `.gitignore`** (already configured)

### Running Tests

#### Interactive Mode (Cypress Test Runner)
```bash
npm run cy:open
# or
npx cypress open
```

#### Headless Mode (CI/CD)
```bash
npm run cy:run
# or
npx cypress run
```

#### Run Specific Test
```bash
npx cypress run --spec "cypress/e2e/001_cheerio-scraper-happy-path.cy.js"
```

#### Run Tests in Specific Browser
```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

### Test Execution Time

- **Happy Path (001)**: ~45-50 seconds
- **Aborting the Run (002)**: ~30-40 seconds
- **Resurrect Run (003)**: ~60-70 seconds
- **Invalid URL (004)**: ~40-50 seconds

**Total**: ~3-4 minutes for all tests

### Test Retries

All tests are configured with **2 retries** in case of failure:
- `runMode: 2` - Retries in headless mode (CI/CD)
- `openMode: 2` - Retries in interactive mode

This improves test stability and handles transient failures (network issues, timeouts, etc.).

## Test Results

All four tests should pass successfully:
- ✅ Happy Path: Verifies complete E2E flow with data validation
- ✅ Aborting the Run: Verifies abort functionality
- ✅ Resurrect Run: Verifies resurrect functionality
- ✅ Invalid URL: Verifies invalid URL handling and empty dataset message

Each test will automatically retry up to 2 times if it fails, improving overall test stability.

## Known Limitations

1. **Export Formats**: Only JSON export is tested. CSV and XLSX exports are not covered.

2. **Input Field Types**: Multiple input types are tested:
   - ✅ Numbers: `maxPagesPerCrawl`, `maxConcurrency`
   - ✅ URLs: `setUrl()`, `setStartUrl()`
   - ✅ Text/Patterns: `setGlob()`

3. **Edge Cases**: Comprehensive edge case coverage:
   - ✅ Abort functionality
   - ✅ Resurrect functionality
   - ✅ Invalid URL handling
   - ✅ Empty dataset message verification

4. **Wait Times**: Fixed wait times may cause flakiness in slower environments. Dynamic polling could be more robust.

5. **Data Validation**: Schema validation is basic. More comprehensive validation could be added.

## Future Improvements

1. **Add More Export Formats**: Implement CSV and XLSX export testing
2. **Add More Input Types**: Test URLs, text, arrays, and boolean inputs
3. **Add More Edge Cases**: Invalid URLs, boundary values, network failures
4. **Dynamic Wait Times**: Replace fixed waits with dynamic polling
5. **Enhanced Schema Validation**: More comprehensive data validation
6. **Parallel Execution**: Run tests in parallel for faster execution
7. **CI/CD Integration**: Add GitHub Actions or similar CI/CD pipeline

## Notes

- Tests use session caching to avoid repeated logins
- Analytics requests are blocked to speed up tests
- All operations are logged to console for debugging
- Test data is stored in fixtures for verification
- Screenshots and videos are generated on test failures
- Tests are configured with 2 retries to handle transient failures
- Test 004 includes cleanup to restore original configuration values
- `maxConcurrency` is set to 1 in test 001 to ensure valid results

