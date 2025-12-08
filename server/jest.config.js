/**
 * Jest configuration to run only integration/system tests under tests/ and ignore __tests__.
 */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "__tests__/"],
  setupFilesAfterEnv: [],
};
