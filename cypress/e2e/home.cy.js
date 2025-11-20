import { HomePage, LoginPage } from '../pages'

describe('Home Page Tests', () => {
  let homePage
  let loginPage

  beforeEach(() => {
    homePage = new HomePage()
    loginPage = new LoginPage()
    
    // Предварительная авторизация перед тестами
    cy.login('testuser', 'testpassword')
  })

  it('should display home page elements', () => {
    homePage
      .open()
      .verifyNavigationVisible()
      .verifyUserLoggedIn()
  })

  it('should perform search', () => {
    const searchQuery = 'test query'

    homePage
      .open()
      .search(searchQuery)
      .shouldHaveUrl(`/search?q=${encodeURIComponent(searchQuery)}`)
  })

  it('should logout successfully', () => {
    homePage
      .open()
      .logout()

    loginPage
      .shouldHaveUrl('/login')
      .verifyLoginFormVisible()
  })

  it('should navigate through menu items', () => {
    homePage
      .open()
      .verifyNavigationVisible()

    // Пример навигации по меню
    cy.get('nav a').first().click()
    cy.url().should('not.include', '/home')
  })
})

