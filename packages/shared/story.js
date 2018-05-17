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
    const options = {
      header: true,
      inline: true,
      text: description,
      ...defaultOptions,
      ...infoOptions
    }

    const stylesFunction = options.styles
      ? stylesheet => options.styles(styles(stylesheet, options), options)
      : stylesheet => styles(stylesheet, options)

    return stories.add(name, withInfo({
      ...options,
      styles: stylesFunction
    })(render))
  }

  // Create helper for controlled stories
  addStory.controlled = function addControlledStory (name, description, render, getInitialState, infoOptions = {}) {
    // Build controller renderer
    const controller = createController(render, getInitialState)

    // Build list of excluded components from propTypes table
    const excludedControllers = [
      controller.Controller,
      ...(defaultOptions.propTablesExclude || []),
      ...(infoOptions.propTablesExclude || [])
    ]

    // Exclude controller from prop types list
    return addStory(name, description, controller, {
      ...infoOptions,
      propTablesExclude: excludedControllers
    })
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
