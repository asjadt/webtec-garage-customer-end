// cypress/e2e/customerForm.spec.js

import CustomerForm from "../../support/objectPages/auth/customerForm";

describe("Customer Registration Form", () => {
  const customerForm = new CustomerForm();

  beforeEach(() => {
    cy.visit("/");
    // customerForm.getCustomerTab().click({ multiple: true });
  });

  it.only("Should successfully register a new customer with valid data", () => {
    // register button
    customerForm.getRegisterButton().click({ force: true });

    cy.fixture("customerData").then((data) => {
      const validCustomer = data.validCustomer;

      customerForm.enterFirstName(validCustomer.firstName);
      customerForm.enterLastName(validCustomer.lastName);
      customerForm.enterEmail(validCustomer.email);
      customerForm.enterPhone(validCustomer.phone);
      customerForm.enterAddressLine1(validCustomer.address_line_1).wait(2000);
      cy.get(".pac-container .pac-item")
        .should("be.visible")
        .first()
        .click({ force: true });
      // customerForm.enterCity(validCustomer.city);
      // customerForm.enterCountry(validCustomer.country);
      // customerForm.enterPostcode(validCustomer.postcode);
      customerForm.enterPassword(validCustomer.password);
      customerForm.submitForm();

      // Assert success message
      // cy.get(".swal2-title").should("contain", "Success");
    });
  });

  it("Should display error messages with invalid data", () => {
    cy.fixture("customerData").then((data) => {
      const invalidCustomer = data.invalidCustomer;

      customerForm.enterFirstName(invalidCustomer.firstName);
      customerForm.enterLastName(invalidCustomer.lastName);
      customerForm.enterEmail(invalidCustomer.email);
      customerForm.enterPhone(invalidCustomer.phone);
      customerForm.enterAddressLine1(invalidCustomer.address_line_1);
      customerForm.enterCity(invalidCustomer.city);
      customerForm.enterCountry(invalidCustomer.country);
      customerForm.enterPostcode(invalidCustomer.postcode);
      customerForm.enterPassword(invalidCustomer.password);
      customerForm.submitForm();

      // Assert error messages
      customerForm.validateErrorMessage("first_Name", "First name is required");
      customerForm.validateErrorMessage("email", "Invalid email");
      customerForm.validateErrorMessage(
        "phone",
        "Phone number must have 11 digits"
      );
      customerForm.validateErrorMessage(
        "password",
        "Password must be at least 8 characters long and must contain a number, lowercase letter, and uppercase letter"
      );
    });
  });
});
