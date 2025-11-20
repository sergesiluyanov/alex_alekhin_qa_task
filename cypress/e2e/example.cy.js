import PublicWebsitePage from '../pages/publicWebsite'

describe('search for actor', () => {
  let publicWebsitePage

  beforeEach(() => {
    publicWebsitePage = new PublicWebsitePage()
  })

  it('should visit public website and search for actor', () => {
    publicWebsitePage.searchForActor().should('have.value', 'Google Maps Scraper')
  })
})

