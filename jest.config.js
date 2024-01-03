module.exports = {
    "transform": {
        "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
        "^.+\\.css$": "identity-obj-proxy",
        "\\.(wav|mp3)$": "jest-transform-stub"
      },
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
    "transformIgnorePatterns": [
        "/node_modules/",
        "\\.css$",
        "\\.(wav|mp3)$"
      ],
      "collectCoverage": true,
      "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
      ],
      "coverageReporters": ["lcov", "text", "html"],
      // ...otras configuraciones de Jest si las tienes
}

