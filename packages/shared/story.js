import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import createController from './story/createController'

/**
 * Build styles for story
 *
 * @param {object} stylesheet
 * @param {object} options
 * @returns {object}
 */
const styles = (stylesheet, options) => ({
  ...stylesheet,
  infoBody: {
    ...stylesheet.infoBody,
    boxShadow: 'none',
    border: 0,
    padding: 0
  },
  propTableHead: options.propTables && options.propTables.length > 1 ? {

  } : {
    display: 'none'
  },
  source: {
    ...stylesheet.source,
    h1: {
      ...stylesheet.source.h1,
      marginBottom: '15px'
    }
  }
})

/**
 * Create factory for stories
 *
 * @param {string} name
 * @param {object} module
 * @param {object} defaultOptions
 *
 * @returns {function(name: string, description: string, render: function)|function(name: string, description: string, render: function, infoOptions: object)|{ controlled: function(name: string, description: string, render: function, getInitialState: function, infoOptions: object)|function(name: string, description: string, render: function, getInitialState: function, infoOptions: object) }}
 */
export function createStoriesFactory (name, module, defaultOptions = {}) {
  const stories = storiesOf(name, module)

  function addStory (name, description, render, infoOptions = {}) {
    // When rendering function expect any arguments,
    // It means that it's controlled
    if (render.length > 0) {
      render = createController(render)

      infoOptions = {
        ...infoOptions,
        propTablesExclude: [
          render.Controller,
          ...(infoOptions.propTablesExclude || [])
        ]
      }
    }

    // Build options for story
    const options = {
      header: true,
      inline: true,
      text: description,
      ...defaultOptions,
      ...infoOptions
    }

    // Build styles factory
    const stylesFunction = options.styles
      ? stylesheet => options.styles(styles(stylesheet, options), options)
      : stylesheet => styles(stylesheet, options)

    // Create story
    return stories.add(name, withInfo({
      ...options,
      styles: stylesFunction
    })(render))
  }

  return addStory
}

/**
 * Get description from README file
 *
 * @param {string} content
 * @returns {string}
 */
export function getReadmeDescription (content) {
  return content
    .replace(/<p><h1([^>]*)>(.*)<\/h1><\/p>/g, '<h1$1>$2</h1>')
    .replace(/^<h1[^>]*>.*<\/h1>/, '')
    .replace(/(<p>)?<h[1-6][> ][^]*$/i, '')
}
