/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
};
