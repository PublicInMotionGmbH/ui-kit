import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'

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
  select(event.currentTarget.querySelector('.storybook-icons__label'))
}

/**
 * Preview of single icon
 *
 * @param {object} props
 * @param {string} props.name
 * @returns {React.Element}
 */
function IconPreview (props) {
  const { name } = props

  return (
    <span className='storybook-icons__icon' key={name} onClick={onClick}>
      <Icon name={name} />
      <span className='storybook-icons__label'>{name}</span>
    </span>
  )
}

IconPreview.propTypes = {
  /** Icon name */
  name: PropTypes.string.isRequired
}

export default IconPreview
