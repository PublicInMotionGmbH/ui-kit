import React from 'react'
import PropTypes from 'prop-types'

import CountryFlag from '../CountryFlag'

/**
 * Select contents of DOM element
 *
 * @param {Node} element
 */
function select (element) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

/**
 * Select icon name on click
 *
 * @param {Event|SyntheticEvent} event
 */
function onClick (event) {
  select(event.currentTarget.querySelector('.storybook-flags__label'))
}

/**
 * Preview of single icon
 *
 * @param {object} props
 * @param {string} props.name
 * @returns {React.Element}
 */
function FlagPreview (props) {
  const { name } = props

  return (
    <span className='storybook-flags__flag' key={name} onClick={onClick}>
      <CountryFlag code={name} />
      <span className='storybook-flags__label'>{name}</span>
    </span>
  )
}

FlagPreview.propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired
}

export default FlagPreview
