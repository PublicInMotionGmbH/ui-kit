const path = require('path')

const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

/**
 * Build configuration for Rollup build
 *
 * @param {object} config
 * @param {object} config.pkg
 * @param {string} config.rootDir
 * @param {string} config.input
 * @param {string} config.output
 * @param {string} [config.environment]
 * @param {bool} [config.minify]  default: true
 */
function buildRollupConfiguration (config) {
    // Check if configuration has been passed
    if (!config || typeof config !== 'object') {
        throw new Error('You have to pass simple configuration')
    }

    // Check if we have package.json to detect dependencies
    if (!config.pkg || typeof config.pkg !== 'object') {
        throw new Error('You have to pass package.json contents')
    }

    // Check if we have root directory for component/module
    if (!config.rootDir || typeof config.rootDir !== 'string') {
        throw new Error('You have to pass root directory')
    }

    // Check if we have input file for module
    if (!config.input || typeof config.input !== 'string') {
        throw new Error('You have to pass input file path')
    }

    // Check if we have output file path
    if (!config.output || typeof config.output !== 'string') {
        throw new Error('You have to pass output file path')
    }

    // Extract required data from arguments
    const pkg = config.pkg
    const rootDir = config.rootDir
    const environment = config.environment || process.env.NODE_ENV || 'production'
    const minify = config.minify || config.minify === void 0
    const input = path.isAbsolute(config.input) ? config.input : path.join(rootDir, config.input)
    const output = path.isAbsolute(config.output) ? config.output : path.join(rootDir, config.output)

    const dependencies = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies))

    // Build basic result
    const result = {
        input: input,
        output: {
            file: output,
            exports: 'named',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            babel({ babelrc: true }),
            commonjs(),
            replace({ 'process.env.NODE_ENV': JSON.stringify(environment) })
        ],
        external: dependencies
    }

    if (minify) {
        result.plugins.push(uglify())
    }

    return result
}

module.exports = buildRollupConfiguration
