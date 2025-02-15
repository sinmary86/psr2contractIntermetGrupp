describe('Полное тестирование проекта', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:5173'); // Убедитесь, что Vite запущен
    });
  
    it('Проверяет загрузку главной страницы', () => {
      cy.contains('ПРОТОКОЛ СОГЛАСОВАНИЯ РАЗНОГЛАСИЙ').should('be.visible'); // Проверяем заголовок
      cy.get('table').should('exist'); // Проверяем, что таблица рендерится
    });
  
    it('Проверяет рендеринг всех основных компонентов', () => {
      cy.get('button').should('have.length.greaterThan', 0); // Кнопки должны присутствовать
      cy.get('table').should('exist'); // Таблица с контрактами должна загружаться
      cy.get('div').contains('Дополнительно').should('be.visible'); // Блок "Дополнительно" должен существовать
    });
  
    it('Проверяет, что Redux Store загружается правильно', () => {
      cy.window().its('store').invoke('getState').should((state) => {
        expect(state.contract).to.exist;
        expect(state.buyer).to.exist;
        expect(state.table).to.exist;
      });
    });
  
    it('Проверяет взаимодействие с таблицей', () => {
      cy.get('table tbody tr').first().click(); // Клик по первой строке таблицы
      cy.get('.selected-row').should('exist'); // Должен выделиться выбранный элемент
    });
  
    it('Проверяет скачивание файла', () => {
      cy.get('button').contains('Скачать').click();
      cy.readFile('cypress/downloads/file.pdf').should('exist');
    });
  
    it('Проверяет API-запросы', () => {
      cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
      cy.visit('/');
      cy.wait('@getBooks');
      cy.get('.book-list').should('have.length.greaterThan', 0);
    });
  
    it('Проверяет отправку формы', () => {
      cy.get('input[name="buyerName"]').type('Тестовый Покупатель');
      cy.get('input[name="contractNumber"]').type('123456');
      cy.get('button').contains('Отправить').click();
      cy.contains('Данные успешно отправлены').should('be.visible');
    });
  
  });
  