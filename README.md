# Cypress Page Object Template

Шаблон для автоматизации тестирования с использованием Cypress и паттерна Page Object.

## Структура проекта

```
.
├── cypress/
│   ├── e2e/                    # Тесты
│   │   └── searchforactor.cy.js  # Тест поиска актора
│   ├── fixtures/              # Тестовые данные
│   │   └── example.json
│   ├── pages/                 # Page Object классы
│   │   └── publicWebsite.js   # Page Object для публичного сайта
│   ├── support/               # Вспомогательные файлы
│   │   ├── commands.js        # Кастомные команды
│   │   └── e2e.js             # Конфигурация поддержки
│   ├── downloads/             # Загруженные файлы (генерируются автоматически)
│   ├── screenshots/           # Скриншоты (генерируются автоматически)
│   └── videos/                # Видео тестов (генерируются автоматически)
├── cypress.config.js          # Конфигурация Cypress
├── package.json               # Зависимости проекта
└── README.md                  # Документация
```

## Установка

1. Установите зависимости:
```bash
npm install
```

## Запуск тестов

### Открыть Cypress Test Runner (интерактивный режим)
```bash
npx cypress open
```

### Запустить все тесты в headless режиме
```bash
npx cypress run
```

## Кастомные команды

Кастомные команды определены в `cypress/support/commands.js`:

### `cy.blockAnalytics()`

Блокирует запросы к аналитическим сервисам (Sentry, Segment, CookiePro и другим). Это ускоряет выполнение тестов и исключает зависимости от внешних сервисов.

**Использование**:
```javascript
beforeEach(() => {
  cy.blockAnalytics()
})
```

### `cy.login(username, password)`

Выполняет логин через API и сохраняет токен в localStorage.

**Использование**:
```javascript
cy.login('username', 'password')
```

Вы можете добавить свои команды в файл `cypress/support/commands.js`.

## Конфигурация

Основные настройки находятся в `cypress.config.js`:

- `viewportWidth/viewportHeight` - размер окна браузера (1280x720)
- `defaultCommandTimeout` - таймаут для команд (10000ms)
- `requestTimeout` - таймаут для запросов (10000ms)
- `pageLoadTimeout` - таймаут загрузки страницы (30000ms)
- `specPattern` - паттерн для поиска тестов
- `video` - запись видео тестов (включена)
- `screenshotOnRunFailure` - скриншоты при ошибках (включены)

## Обработка ошибок

В `cypress/support/e2e.js` настроена обработка необработанных исключений, чтобы тесты не падали из-за ошибок React и других библиотек:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
```

## Лучшие практики

1. **Используйте Page Object** - инкапсулируйте логику работы со страницами в отдельные классы
2. **Методы должны возвращать `this`** - для поддержки цепочки вызовов (method chaining)
3. **Именуйте тесты понятно** - используйте описательные названия `it('should ...')`
4. **Используйте `beforeEach`** - для подготовки данных перед каждым тестом (например, блокировка аналитики)
5. **Разделяйте тесты по функциональности** - создавайте отдельные файлы для разных страниц/функций
6. **Блокируйте аналитику** - используйте `cy.blockAnalytics()` для ускорения тестов

## Дополнительные ресурсы

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Login-Custom-Commands)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

## Лицензия

MIT
