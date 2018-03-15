module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupFiles: ['<rootDir>/../../tests/polyfills.js'],
  setupTestFrameworkScriptFile: '<rootDir>/../../tests/setupTests',
  testMatch: ['<rootDir>/tests/**/?(*.)test.{js,jsx}'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/../../tests/babelTransform',
    '^.+\\.css$': '<rootDir>/../../tests/cssTransform',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/../../tests/fileTransform'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['js', 'json', 'jsx']
}
