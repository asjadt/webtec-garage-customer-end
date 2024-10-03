class LoginPage {
  // Getters for elements

  getLoginButton() {
    return cy.get('[data-auto="login-button"]');
  }
  getEmailInput() {
    return cy.get("#email");
  }

  getPasswordInput() {
    return cy.get('[data-cy="login_password"]');
  }

  getSubmitButton() {
    return cy.get('[data-cy="login_submit_handler"]');
  }

  getForgotPasswordLink() {
    return cy.get('[data-cy="login_forget_password"]');
  }

  getRegisterButton() {
    return cy.get('[data-cy="login_forget_password"]');
  }

  // Actions
  typeEmail(email) {
    this.getEmailInput().clear().type(email);
  }

  typePassword(password) {
    this.getPasswordInput().clear().type(password);
  }

  clickSubmit() {
    this.getSubmitButton().click();
  }

  clickForgotPassword() {
    this.getForgotPasswordLink().click();
  }

  clickRegister() {
    this.getRegisterButton().click();
  }
}

// Export the instance of the page object
export default new LoginPage();
