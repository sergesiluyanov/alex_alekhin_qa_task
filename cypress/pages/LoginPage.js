import BasePage from './BasePage'

/**
 * Page Object для страницы логина
 * Пример использования паттерна Page Object
 */
class LoginPage extends BasePage {
  // Селекторы элементов страницы
  get usernameInput() {
    return '#username'
  }

  get passwordInput() {
    return '#password'
  }

  get loginButton() {
    return 'button[type="submit"]'
  }

  get errorMessage() {
    return '.error-message'
  }

  get forgotPasswordLink() {
    return 'a[href*="forgot-password"]'
  }

  /**
   * Открыть страницу логина
   */
  open() {
    this.visit('/login')
    return this
  }

  /**
   * Ввести имя пользователя
   * @param {string} username - имя пользователя
   */
  enterUsername(username) {
    this.type(this.usernameInput, username)
    return this
  }

  /**
   * Ввести пароль
   * @param {string} password - пароль
   */
  enterPassword(password) {
    this.type(this.passwordInput, password)
    return this
  }

  /**
   * Выполнить логин
   * @param {string} username - имя пользователя
   * @param {string} password - пароль
   */
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.click(this.loginButton)
    return this
  }

  /**
   * Проверить отображение сообщения об ошибке
   * @param {string} expectedMessage - ожидаемое сообщение
   */
  verifyErrorMessage(expectedMessage) {
    this.shouldBeVisible(this.errorMessage)
    this.shouldContainText(this.errorMessage, expectedMessage)
    return this
  }

  /**
   * Проверить, что поля формы отображаются
   */
  verifyLoginFormVisible() {
    this.shouldBeVisible(this.usernameInput)
    this.shouldBeVisible(this.passwordInput)
    this.shouldBeVisible(this.loginButton)
    return this
  }

  /**
   * Кликнуть на ссылку "Забыли пароль?"
   */
  clickForgotPassword() {
    this.click(this.forgotPasswordLink)
    return this
  }
}

export default LoginPage

