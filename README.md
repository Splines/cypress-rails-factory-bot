<div align="center">
  <img src="https://github.com/Splines/cypress-rails-factory-bot/assets/37160523/febf4da2-5f6b-45ad-b7ec-7162ce4e9940"
    width="600px" alt="Decorating header image"/>
  <h3 align="center">Cypress ❤ FactoryBot (Ruby on Rails)</h3>
</div>

A blog post / demo for how to use [FactoryBot](https://github.com/thoughtbot/factory_bot), the [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) and programmatic login in Cypress with Ruby on Rails. This is _not_ a library as it's easy enough to copy and paste the few lines of code into your own project without any additional dependencies. Here's how a Cypress test might look like in the end (see it [here](./demo/spec/cypress/e2e/submissions_spec.cy.js) for a commented version)

**How your Cypress tests can look like:**
```js
// spec/cypress/e2e/submissions_spec.cy.js
import FactoryBot from "../support/factorybot";

describe("Submissions", () => {
  beforeEach(() => {
    cy.cleanDatabase();
    cy.createUserAndLogin("generic");
  });

  it("can create a submission", function () {
    FactoryBot.create("assignment", "with_deadline_tomorrow", { file_type: ".pdf", size_max: 10 })
      .as("assignment");

    cy.then(() => {
      console.log(this.assignment);
    });
  });
});
```


### 💡 **Motivation**
Testing tools should work _for_, not _against_ you. And Cypress for sure works _for_ you; it's a great UI testing framework. In order to setup reliable test, you should test specs in **isolation**, i.e. tests should not depend on each other. This includes cleaning the database before each test run and creating mock data. For Rails tests, we have the great [FactoryBot](https://github.com/thoughtbot/factory_bot?tab=readme-ov-file) that helps us with this. And there's also a [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) to ensure a clean state for tests.

But how can we use these tools in Cypress, a frontend tool that doesn't have access to the database?


### **`cypress-on-rails`?**

We've been using [cypress-on-rails](https://github.com/shakacode/cypress-on-rails) to achieve this so far and it works. However, we didn't like the interface as it was so different from what we were used to in RSpec. It also requires you to [set up associations manually](https://github.com/shakacode/cypress-on-rails/blob/master/docs/factory_bot_associations.md), which is a bit of a pain. So, we decided to write our own solution, and it turns out that it's really not that hard to get it up and running.


### 🌟 **Solution**

This solution is inspired by [this great blog post by Tom Conroy](https://tbconroy.com/2018/04/07/creating-data-with-factorybot-for-rails-cypress-tests/). You can find all necessary files inside the `demo/` folder, feel free to use them in your own project (you don't have to, but you _can_ link back to this repo to let others know about it). Here's an overview of what we do. Follow these steps to apply it to your own project. The individual files are commented and should be self-explanatory.

- Set up custom [**Rails routes**](./demo/config/routes.rb) (only available in the Rails test environment) with respective [**controllers**](./demo/app/controllers/) that execute the backend code, e.g. call the FactoryBot, use the DatabaseCleaner or create a new user (or anything you like). <sub>The [`cypress_controller.rb`](demo/app/controllers/cypress/cypress_controller.rb) is the base class that the other controllers inherit from. It's just there to ensure errors are sent back to the frontend, such that you can see them in Cypress in the test browser.</sub>
- Implement a [**JS interface for Cypress**](./demo/spec/cypress/support/backend_caller.js) that allows to call these routes from the Cypress test and provide nice error logging in case anything goes wrong.
- That's basically it. Now you can define [**custom Cypress commands**](./demo/spec/cypress/support/commands.js) in Cypress or even your own JS classes, e.g. the [**FactoryBot**](./demo/spec/cypress/support/factorybot.js) wrapper. Import it via `import FactoryBot from "../support/factorybot";` and you're ready to use `FactoryBot.create("...")` in your Cypress tests as shown above.

This solution is easily extendable. Add more controllers, routes and custom Cypress commands as you see fit.
