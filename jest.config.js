module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  coverageDirectory: ".coverage",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/lib/"],
};
