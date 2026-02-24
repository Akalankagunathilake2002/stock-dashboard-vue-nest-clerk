describe("UI Smoke Test", () => {
  it("loads dashboard and shows header", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Welcome to the real-time Stocks Dashbaord").should("be.visible");
    cy.contains("Stocks").should("be.visible");
    cy.contains("Sign in").should("be.visible");
  });
});