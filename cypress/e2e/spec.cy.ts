describe('Anonymous user', () => {
  describe('when an user opens the main page', () => {
    it('should render the Map', () => {
      cy.visit('http://localhost:8080/');
      cy.get('[aria-label=Map]').should('exist');
      // cy.get('textarea')
      //     .first()
      //     .type('Hello World!')
      //     .press(Cypress.Keyboard.Keys.ENTER);
      // cy.matchScreenshot('Google Screenshot');
    });
  });

  describe('when an user clicks Log In', () => {
    it('should open the login form', () => {
      cy.visit('http://localhost:8080/');
      cy.contains('Log In').click();
      cy.contains('Login');
      // cy.matchScreenshot('Login form');
    });
  });

  describe('when an user logs in', () => {
    it('should redirect user to the main page', () => {
      cy.visit('http://localhost:8080/');
      cy.contains('Log In').click();
      cy.get('form input').first().type('some-login');
      cy.get('form input').last().type('some-password');
      cy.get('form button').last().click();

      cy.contains('Log out').should('exist')
      // cy.matchScreenshot('Login form');
    });
  });

});
