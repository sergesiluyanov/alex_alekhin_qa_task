import BasePage from './BasePage'

/**
 * Page Object для главной страницы
 * Пример использования паттерна Page Object
 */
class HomePage extends BasePage {
  // Селекторы элементов страницы
  get header() {
    return 'header'
  }

  get navigationMenu() {
    return 'nav'
  }

  get searchInput() {
    return 'input[type="search"]'
  }

  get searchButton() {
    return 'button[type="submit"]'
  }

  get userProfileButton() {
    return '[data-testid="user-profile"]'
  }

  get logoutButton() {
    return '[data-testid="logout"]'
  }

  /**
   * Открыть главную страницу
   */
  open() {
    this.visit('/')
    return this
  }

  /**
   * Выполнить поиск
   * @param {string} query - поисковый запрос
   */
  search(query) {
    this.type(this.searchInput, query)
    this.click(this.searchButton)
    return this
  }

  /**
   * Проверить, что пользователь залогинен
   */
  verifyUserLoggedIn() {
    this.shouldBeVisible(this.userProfileButton)
    return this
  }

  /**
   * Выполнить выход из системы
   */
  logout() {
    this.click(this.userProfileButton)
    this.click(this.logoutButton)
    return this
  }

  /**
   * Проверить наличие навигационного меню
   */
  verifyNavigationVisible() {
    this.shouldBeVisible(this.navigationMenu)
    return this
  }
}

export default HomePage

