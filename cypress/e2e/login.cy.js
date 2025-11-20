import { LoginPage, HomePage } from '../pages'

describe('Login Page Tests', () => {
  let loginPage
  let homePage

  beforeEach(() => {
    loginPage = new LoginPage()
    homePage = new HomePage()
  })

  it('should display login form', () => {
    loginPage
      .open()
      .verifyLoginFormVisible()
  })

  it('should login successfully with valid credentials', () => {
    const username = 'testuser'
    const password = 'testpassword'

    loginPage
      .open()
      .login(username, password)

    homePage
      .verifyUserLoggedIn()
      .shouldHaveUrl('/home')
  })

  it('should show error message with invalid credentials', () => {
    const username = 'invaliduser'
    const password = 'wrongpassword'

    loginPage
      .open()
      .login(username, password)
      .verifyErrorMessage('Invalid username or password')
  })

  it('should navigate to forgot password page', () => {
    loginPage
      .open()
      .clickForgotPassword()
      .shouldHaveUrl('/forgot-password')
  })

  it('should validate required fields', () => {
    loginPage
      .open()
      .click(loginPage.loginButton)

    // Проверка валидации полей
    cy.get(loginPage.usernameInput).should('have.attr', 'required')
    cy.get(loginPage.passwordInput).should('have.attr', 'required')
  })
})

