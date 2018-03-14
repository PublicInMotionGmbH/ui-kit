const path = require('path')

module.exports = wallaby => {
  return {
    files: [
        { pattern: 'tests/*.js', instrument: false },
        'packages/*/src/**/*.js',
        'config.js',
        { pattern: 'packages/*/tests/**/*.test.js.snap', instrument: false }
    ],

    tests: [
        'packages/*/tests/**/*.test.js'
    ],

    env: {
        type: 'node',
        runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: [ 'react-app' ]
      })
    },

    setup: wallaby => {
        const path = require('path')

        wallaby.testFramework.configure({
          collectCoverageFrom: [
            'packages/*/src/**/*.{js,jsx}'
          ],
          setupFiles: [
            path.resolve('./tests/polyfills.js')
          ],
          setupTestFrameworkScriptFile: path.resolve('./tests/setupTests'),
          testMatch: [
            path.resolve('packages/*/tests/**/?(*.)test.{js,jsx}')
          ],
          testEnvironment: 'jsdom',
          testURL: 'http://localhost',
          transform: {
            '^.+\\.css$': path.resolve('./tests/cssTransform'),
            '^(?!.*\\.(js|jsx|css|json)$)': path.resolve('./tests/fileTransform')
          },
          transformIgnorePatterns: [
            '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
          ],
          moduleFileExtensions: [
            'js',
            'json',
            'jsx'
          ]
        })
    },

    testFramework: 'jest'
  }
}
