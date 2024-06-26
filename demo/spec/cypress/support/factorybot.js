// https://github.com/Splines/cypress-rails-factory-bot

import BackendCaller from "./backend_caller";

/**
 * Helper to access FactoryBot factories from Cypress tests.
 */
class FactoryBot {
  /**
   * Creates (builds and saves) a record/mock using FactoryBot.
   * @param args The arguments to pass to FactoryBot.create(), e.g.
   * factory name, traits, and attributes. Pass them in as separated
   * string arguments. Attributes should be passed as an object.
   * @returns The FactoryBot.create() response
   *
   * @example
   * FactoryBot.create("assignment", "with_deadline_tomorrow", { file_type: ".pdf", size_max: 10 })
   */
  create(...args) {
    return BackendCaller.callCypressRoute("factories", "FactoryBot.create()", args);
  }
}

export default new FactoryBot();
