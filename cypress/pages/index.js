/**
 * Централизованный экспорт всех Page Object классов
 * Упрощает импорт в тестах
 */

import BasePage from './BasePage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'

export {
  BasePage,
  LoginPage,
  HomePage
}

