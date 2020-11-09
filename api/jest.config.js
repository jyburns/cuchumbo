module.exports = {
  verbose: true,
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "lib/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};