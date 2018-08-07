import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import ListOption from './ListOption'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Options to show */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Id for option */
    id: PropTypes.string.isRequired,

    /** Type of icon */
    icon: PropTypes.string,

    /** Label for option */
    label: PropTypes.string,

    /** Default value */
    default: PropTypes.number,

    /** Minimum value within the range */
    min: PropTypes.number,

    /** Maximum value within the range */
    max: PropTypes.number
  })),

  /** Input value */
  value: PropTypes.object.isRequired,

  /** Event handler fired when any value has changed */
  onChange: PropTypes.func
}

const defaultProps = {
  options: []
}

export const moduleName = 'options-input-list'

/**
 * Component which represents drop-down list of options.
 *
 * @param {object} props
 * @param {object[]} props.options
 * @param {object} props.value
 * @param {string} [props.className]
 *
 * @returns {React.Element}
 */
function OptionsInputList (props) {
  const { className, value, options, onChange, ...passedProps } = props

  const listElements = options.map(x => (
    <ListOption
      key={x.id}
      option={x}
      value={value[x.id]}
      onChange={onChange}
    />
  ))

  return (
    <div className={buildClassName(moduleName, className)} {...passedProps}>
      {listElements}
    </div>
  )
}

OptionsInputList.displayName = 'OptionsInputList'

OptionsInputList.propTypes = propTypes
OptionsInputList.defaultProps = defaultProps

export default OptionsInputList
