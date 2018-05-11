import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  /** Data for generate option */
  option: PropTypes.object
}

/**
 * * Component which represents OptionLabel.
 *
 * @param {*} props
 * @param {object} props.option
 *
 * @returns {React.Element}
 */
function OptionLabel (props) {
  const { option } = props

  return (
    <React.Fragment>
      <h6>{option.label}</h6>
      {option.description ? <p>{option.description}</p> : null}
    </React.Fragment>
  )
}

OptionLabel.propTypes = propTypes

export default OptionLabel
