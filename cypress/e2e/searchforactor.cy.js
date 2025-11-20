import PublicWebsitePage from '../pages/publicWebsite'

describe('search for actor', () => {
  beforeEach(() => {
    cy.blockAnalytics()
  })

  it('should visit public website and search for actor', () => {
    PublicWebsitePage.searchForActor()
  })
})

