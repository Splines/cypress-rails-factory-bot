import FactoryBot from "../support/factorybot";

describe("Submissions", () => {
  beforeEach(() => {
    // cy.cleanDatabase(); is automatically called before each test
    // (see the spec/cypress/support/commands.js file)

    // Create a user and log in programmatically (not via the UI)
    cy.createUserAndLogin("generic");
  });

  it("can create a submission", function () {
    // Use FactoryBot like you're used to from Rails tests (e.g. RSpec tests)
    // In this example:
    // - "with_deadline_tomorrow" is a trait.
    // - "file_type" and "size_max" override the values, see
    //   https://thoughtbot.github.io/factory_bot/using-factories/attribute-overrides.html
    //
    // The similar syntax in Rails would be:
    // FactoryBot.create(:assignment, :with_deadline_tomorrow, file_type: ".pdf", size_max: 10)
    FactoryBot.create("assignment", "with_deadline_tomorrow", { file_type: ".pdf", size_max: 10 })
      .as("assignment"); // https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Sharing-Context

    cy.then(() => {
      // Note you have to use function () {} instead of () => {} for the it() block.
      // Otherwise, the "this" context will not be available.
      console.log(this.assignment);

      // Have fun and do whatever you want with the created object...
    });
  });
});
