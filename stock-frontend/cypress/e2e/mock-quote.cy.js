describe("Mock Quote API", () => {
  it("mocks /stocks/quote and verifies UI updates", () => {
    cy.intercept(
      "GET",
      "http://localhost:3000/stocks/quote*",
      { fixture: "quote_aapl.json" }
    ).as("getQuote");

    cy.visit("http://localhost:5173");

    // If QuotePanel has a button like "Watch Market" click it
    cy.contains("Watch Market").click({ force: true });

    cy.wait("@getQuote");
    cy.contains("AAPL").should("exist");
    cy.contains("195.20").should("exist");
  });
});