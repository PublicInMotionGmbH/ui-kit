const testsPattern = process.env.TESTS_PATTERN

if (!testsPattern) {
  throw new Error('Tests running without TESTS_PATTERN environment variable!')
}

module.exports = {
  collectCoverageFrom: [
    'packages/**/*.js',
    '!packages/*/index.js',
    '!packages/*/stories.js',
    '!packages/*/dist/**/*.js',
    '!packages/country-flag/sprites/*.js',
    '!packages/country-flag/scripts/*.js',
    '!packages/country-flag/src/storybook/*.js',
    '!packages/icon/src/storybook/*.js',
    '!packages/*/tests/**/*.js',
    '!packages/icon/scripts/*.js'
  ],
  setupFiles: [ '<rootDir>/tests/polyfills.js' ],
  setupTestFrameworkScriptFile: '<rootDir>/tests/setupTests',
  testMatch: [ testsPattern ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.js$': '<rootDir>tests/babelTransform',
    '^.+\\.css$': '<rootDir>/tests/cssTransform',
    '^(?!.*\\.(js|css|json)$)': '<rootDir>/tests/fileTransform'
  },
  transformIgnorePatterns: [ '[/\\\\]node_modules[/\\\\].+\\.js$' ],
  moduleFileExtensions: [ 'js', 'json' ]
}
