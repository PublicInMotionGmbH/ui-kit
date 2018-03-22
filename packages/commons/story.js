import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import createController from './story/createController'

/**
 * Build styles for story
 *
 * @param {object} stylesheet
 * @returns {object}
 */
const styles = stylesheet => ({
  ...stylesheet,
  infoBody: {
    ...stylesheet.infoBody,
    boxShadow: 'none',
    border: 0,
    padding: 0
  },
  propTableHead: {
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
 *
 * @returns {function(name: string, description: string, render: function)|{ controlled: function(name: string, description: string, render: function, getInitialState: function) }}
 */
export function createStoriesFactory (name, module) {
  const stories = storiesOf(name, module)

  function addStory (name, description, render) {
    return stories.add(
      name,
      withInfo({
        styles: styles,
        header: true,
        inline: true,
        text: description
      })(render)
    )
  }

  // Create helper for controlled stories
  addStory.controlled = function addControlledStory (name, description, render, getInitialState) {
    return addStory(name, description, createController(render, getInitialState))
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
    .replace(/^<p><h1[^>]*>.*<\/h1><\/p>/g, '')
    .replace(/(<p>)?<h[1-6][> ][^]*$/i, '')
}
