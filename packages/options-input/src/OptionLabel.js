import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Data for generate option */
  option: PropTypes.shape({

    /** Label for option */
    label: PropTypes.string,

    /** Description for option */
    description: PropTypes.string
  })
}

/**
 * * Component which represents OptionLabel.
 *
 * @param {*} props
 * @param {object} props.option
 * @param {string} props.option.description
 * @param {string} props.option.label
 *
 * @returns {React.Element}
 */
function OptionLabel (props) {
  const { option: { description, label } } = props

  return (
    <React.Fragment>
      <span className='options-input__option-label__title'>{label}</span>
      {description ? <span className='options-input__option-label__description'>{description}</span> : null}
    </React.Fragment>
  )
}

OptionLabel.propTypes = propTypes

export default OptionLabel
