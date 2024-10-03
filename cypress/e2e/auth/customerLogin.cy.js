import loginPage from "../../support/objectPages/loginPage";

describe("Login Page", () => {
  before(() => {
    cy.fixture("loginData").then(function (data) {
      this.data = data;
    });
    cy.visit("/"); // Assuming /login is the URL for the login page
  });

  it.only("should log in successfully with valid credentials", function () {
    loginPage.getLoginButton().click();
    // Use POM to interact with the login form
    loginPage.typeEmail(this.data.email);
    loginPage.typePassword(this.data.password);
    loginPage.clickSubmit();

    // Assert that user is logged in or redirected
    cy.url().should("include", "/"); // Adjust according to your app
  });

  it("should show an error for invalid credentials", function () {
    // Provide invalid credentials
    loginPage.typeEmail("invalid@example.com");
    loginPage.typePassword("wrongpassword");
    loginPage.clickSubmit();

    // Assert that error message is displayed
    cy.get('[data-cy="login_email_error"]').should(
      "contain",
      "Invalid email or password"
    );
  });

  it("should navigate to forgot password page", function () {
    // Click on Forgot Password link
    loginPage.clickForgotPassword();

    // Assert that the reset password popup is opened
    cy.get('[data-cy="reset_password_popup"]').should("be.visible");
  });

  it("should navigate to register page", function () {
    // Click on Create An Account button
    loginPage.clickRegister();

    // Assert that the sign-up popup or register page is opened
    cy.get('[data-cy="signup_form"]').should("be.visible");
  });
});
