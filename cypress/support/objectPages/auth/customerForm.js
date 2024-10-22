class CustomerForm {
  visit() {
    cy.visit("/");
  }

  getRegisterButton() {
    return cy.get('[data-auto="register-button"]');
  }

  getCustomerTab() {
    cy.get('[data-auto="tab-customer"]');
  }

  enterFirstName(firstName) {
    cy.get("[data-auto='customer-first_Name']").type(firstName);
  }
  enterLastName(lastName) {
    cy.get("#last_Name").type(lastName);
  }

  enterEmail(email) {
    cy.get("[data-auto='customer-email']").type(email);
  }

  enterPhone(phone) {
    cy.get("[data-auto='customer-phone']").type(phone);
  }

  enterAddressLine1(address) {
    cy.get("[data-testId='customer-address_line_1']").type(address);
  }

  enterCity(city) {
    cy.get("[data-auto='customer-city']").type(city);
  }

  enterCountry(country) {
    cy.get("[data-auto='customer-country']").type(country);
  }

  enterPostcode(postcode) {
    cy.get("[data-auto='customer-postcode']").type(postcode);
  }

  enterPassword(password) {
    cy.get("#password").type(password);
  }

  submitForm() {
    cy.get("[data-auto='register-button']").click({
      force: true,
      multiple: true,
    });
  }

  validateErrorMessage(fieldName, message) {
    cy.get(`[data-auto="${fieldName}-error"]`).should("contain.text", message);
  }
}

export default CustomerForm;
