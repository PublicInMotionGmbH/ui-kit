const path = require('path')
const glob = require('glob')

module.exports = wallaby => {
  const innerDependencies = [ 'node_modules/' ].concat(
    glob.sync('packages/*/node_modules/')
  )

  process.env.NODE_PATH = innerDependencies
    .map(x => path.join(__dirname, x).replace(/.$/, ''))
    .join(':')

  return {
    files: [
      { pattern: 'tests/*.js', instrument: false },
      { pattern: 'packages/**/*.json', instrument: false },
      'packages/shared/story.js',
      'packages/shared/story/*.js',
      'packages/*/config.js',
      'packages/*/src/**/*.js',
      'packages/*/sprites/*.js',
      'packages/*/utils/**/*.js',
      'packages/*/tests/utils/**/*.js',
      'packages/*/tests/fixtures/**/*.js',
      { pattern: 'packages/*/tests/**/*.test.js.snap', instrument: false }
    ],

    tests: [ 'packages/*/tests/**/*.test.js' ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      })
    },

    setup: wallaby => {
      const path = require('path')

      wallaby.testFramework.configure({
        setupFiles: [ path.resolve('./tests/polyfills.js') ],
        setupTestFrameworkScriptFile: path.resolve('./tests/setupTests'),
        testMatch: [ path.resolve('packages/*/tests/**/*.test.js') ],
        testEnvironment: 'jsdom',
        testURL: 'http://localhost',
        transform: {
          '^.+\\.css$': path.resolve('./tests/cssTransform'),
          '^(?!.*\\.(js|css|json)$)': path.resolve('./tests/fileTransform')
        },
        transformIgnorePatterns: [ '[/\\\\]node_modules[/\\\\].+\\.js$' ],
        moduleFileExtensions: [ 'js', 'json' ]
      })
    },

    testFramework: 'jest'
  }
}
