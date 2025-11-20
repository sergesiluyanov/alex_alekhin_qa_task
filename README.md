# Cypress Page Object Template

Шаблон для автоматизации тестирования с использованием Cypress и паттерна Page Object.

## Структура проекта

```
.
├── cypress/
│   ├── e2e/                    # Тесты
│   ├── fixtures/              # Тестовые данные
│   │   └── example.json
│   ├── pages/                 # Page Object классы
│   ├── support/               # Вспомогательные файлы
│   │   ├── commands.js        # Кастомные команды
│   │   └── e2e.js             # Конфигурация поддержки
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
npm run cy:open
```

### Запустить все тесты в headless режиме
```bash
npm run cy:run
```

### Запустить тесты в headed режиме (с браузером)
```bash
npm run cy:run:headed
```

### Запустить тесты в конкретном браузере
```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

## Page Object Pattern

### Базовый класс (BasePage)

`BasePage` содержит общие методы, которые могут использоваться на всех страницах:
- `visit(path)` - открыть страницу
- `click(selector)` - кликнуть по элементу
- `type(selector, text)` - ввести текст
- `shouldBeVisible(selector)` - проверить видимость
- `shouldContainText(selector, text)` - проверить текст
- И другие полезные методы

### Создание нового Page Object

1. Создайте новый файл в папке `cypress/pages/`, например `ProductPage.js`:

```javascript
import BasePage from './BasePage'

class ProductPage extends BasePage {
  // Определите селекторы как геттеры
  get productTitle() {
    return '.product-title'
  }

  get addToCartButton() {
    return 'button.add-to-cart'
  }

  // Определите методы для взаимодействия со страницей
  open(productId) {
    this.visit(`/products/${productId}`)
    return this
  }

  addToCart() {
    this.click(this.addToCartButton)
    return this
  }

  verifyProductTitle(expectedTitle) {
    this.shouldContainText(this.productTitle, expectedTitle)
    return this
  }
}

export default ProductPage
```

2. Добавьте экспорт в `cypress/pages/index.js`:

```javascript
import ProductPage from './ProductPage'

export {
  // ... другие экспорты
  ProductPage
}
```

3. Используйте в тестах:

```javascript
import { ProductPage } from '../pages'

describe('Product Page', () => {
  it('should add product to cart', () => {
    const productPage = new ProductPage()
    productPage
      .open(123)
      .verifyProductTitle('Test Product')
      .addToCart()
  })
})
```

## Кастомные команды

Кастомные команды определены в `cypress/support/commands.js`. Примеры:

- `cy.login(username, password)` - выполнить логин через API

Вы можете добавить свои команды в этот файл.

## Конфигурация

Основные настройки находятся в `cypress.config.js`:

- `baseUrl` - базовый URL приложения
- `viewportWidth/viewportHeight` - размер окна браузера
- `defaultCommandTimeout` - таймаут для команд
- `specPattern` - паттерн для поиска тестов

## Лучшие практики

1. **Используйте Page Object** - инкапсулируйте логику работы со страницами в отдельные классы
2. **Используйте геттеры для селекторов** - это упрощает поддержку и переиспользование
3. **Методы должны возвращать `this`** - для поддержки цепочки вызовов (method chaining)
4. **Именуйте тесты понятно** - используйте описательные названия `it('should ...')`
5. **Используйте `beforeEach`** - для подготовки данных перед каждым тестом
6. **Разделяйте тесты по функциональности** - создавайте отдельные файлы для разных страниц/функций

## Дополнительные ресурсы

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Login-Custom-Commands)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

## Лицензия

MIT

