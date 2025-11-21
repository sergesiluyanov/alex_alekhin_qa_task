# Подход к E2E тестированию с переходами между доменами

## Проблема

В тестовом задании требуется автоматизировать flow, который включает:
1. Работу на **Public Website** (apify.com)
2. Переход на **Apify Console** (console.apify.com)
3. Выполнение действий в консоли

Это классический случай **кросс-доменного тестирования**.

## Решение

### 1. Разделение на Page Objects

Каждый домен/приложение имеет свой Page Object:

- **`PublicWebsitePage`** - для работы с apify.com
  - Поиск акторов
  - Навигация по публичному сайту
  
- **`ConsolePage`** - для работы с console.apify.com
  - Работа с акторами
  - Настройка input
  - Запуск и мониторинг runs
  - Работа с datasets

### 2. Переход между доменами

Переход происходит через **редирект** при клике на кнопку "Try for free":

```javascript
// В PublicWebsitePage
searchForActor() {
  // ... действия на apify.com
  cy.get('#actor-detail-try-for-free-button').click({force: true})
  // После клика происходит редирект на console.apify.com
  return ConsolePage  // Возвращаем объект для работы с консолью
}
```

**Важно:** Cypress может работать с переходами между доменами через редирект без дополнительных настроек. Если бы переход был прямым (через `cy.visit()`), могла бы потребоваться настройка `chromeWebSecurity: false`.

### 3. Структура E2E теста

```javascript
it('should search, configure, run Cheerio Scraper and verify results', () => {
  // Шаг 1: Работа на Public Website
  const consolePage = PublicWebsitePage.searchForActor()
  
  // Шаг 2: Переход на Console (происходит автоматически)
  consolePage
    .waitForPageLoad()      // Ждем загрузки новой страницы
    .verifyOnConsolePage()  // Проверяем, что мы на правильной странице
  
  // Шаг 3-6: Работа в Console
  consolePage
    .setMinimalInput()
    .runActor()
    .waitForRunToComplete()
    .verifyDatasetHasItems(1)
})
```

### 4. Ожидания и стабильность

При работе с переходами между доменами важно:

- **Ждать загрузки страницы** после редиректа:
  ```javascript
  waitForPageLoad() {
    cy.url().should('include', 'console.apify.com')
    cy.get('body').should('be.visible')
  }
  ```

- **Использовать таймауты** для долгих операций:
  ```javascript
  waitForRunToComplete(timeout = 120000) {
    cy.contains('Succeeded', { timeout }).should('be.visible')
  }
  ```

- **Проверять URL** для подтверждения перехода:
  ```javascript
  verifyOnConsolePage() {
    cy.url().should('include', 'console.apify.com')
  }
  ```

## Преимущества подхода

1. **Разделение ответственности** - каждый Page Object отвечает за свой домен
2. **Переиспользование** - методы можно использовать в разных тестах
3. **Читаемость** - тесты читаются как документация
4. **Поддерживаемость** - изменения в одном домене не влияют на другой

## Альтернативные подходы

Если бы переход был прямым (не через редирект), можно было бы:

1. Использовать `chromeWebSecurity: false` в конфиге (не рекомендуется для production)
2. Использовать `cy.origin()` для работы с разными доменами (Cypress 9.6.0+)
3. Разделить тесты на два отдельных (но это не e2e)

В нашем случае редирект решает проблему автоматически.

