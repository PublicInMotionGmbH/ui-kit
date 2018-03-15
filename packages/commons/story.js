import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

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
 * @returns {function(name: string, description: string, render: function)}
 */
export function createStoriesFactory (name, module) {
    const stories = storiesOf(name, module)

    return (name, description, render) => stories.add(name, withInfo({
        styles: styles,
        header: true,
        inline: true,
        text: description
    })(render))
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
