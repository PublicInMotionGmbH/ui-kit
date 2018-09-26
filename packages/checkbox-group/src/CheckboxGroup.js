import React from 'react'
import PropTypes from 'prop-types'

import memoizeOne from 'memoize-one'

import { Checkbox } from '@talixo/checkbox'

import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Name of checkbox group */
  name: PropTypes.string.isRequired,

  /** Is this value incorrect? */
  error: PropTypes.bool,

  /** Array of objects which represent options */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Label to show */
    label: PropTypes.node.isRequired,

    /** Value it represents */
    value: PropTypes.any.isRequired,

    /** Is this option disabled? */
    disabled: PropTypes.bool
  })),

  /** Value of default option */
  value: PropTypes.any,

  /** Should it be disabled? */
  disabled: PropTypes.bool,

  /** Should it be read-only? */
  readOnly: PropTypes.bool
}

const defaultProps = {
  error: false,
  disabled: false,
  readOnly: false
}
/**
 * Check if both lists contain same elements.
 * This function is intented for use only here,
 * as it has some problems (which do not apply to CheckboxGroup),
 * i.e. compare [ 1, 1, 2 ] with [ 1, 2, 2 ]
 *
 * @param {array} prevList
 * @param {array} nextList
 * @returns {boolean}
 */
function isSameList (prevList, nextList) {
  if (prevList.length !== nextList.length) {
    return false
  }

  for (let i = 0; i < prevList.length; i++) {
    if (nextList.indexOf(prevList[i]) === -1) {
      return false
    }
  }

  return true
}

/**
 * Purify to target value.
 *
 * @param {array} [value]
 * @param {object[]} options
 */
function buildValue (value, options) {
  const availableOptions = options.map(x => x.value)

  // Remove not existing options
  value = value == null
    ? []
    : [].concat(value).filter(x => availableOptions.indexOf(x) !== -1)

  // Remove duplicates
  return value.filter((x, i) => value.indexOf(x) === i)
}

const memoizedBuildValue = memoizeOne(buildValue)

/**
 * Component which represents CheckboxGroup.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.name]
 * @property {array} [props.options]
 * @property {string} [props.size]
 * @property {array} [props.value]
 * @property {boolean} [props.disabled]
 * @property {boolean} [props.readOnly]
 * @class
 */
class CheckboxGroup extends React.PureComponent {
  state = {
    value: memoizedBuildValue(this.props.value, this.props.options)
  }

  static getDerivedStateFromProps (props, state) {
    const nextValue = memoizedBuildValue(props.value, props.options)

    if (props.value !== undefined && state.value !== nextValue) {
      if (!isSameList(state.value, nextValue)) {
        return { value: nextValue }
      } else return null
    }
  }

  change (value, checked) {
    const nextValue = this.state.value.filter(x => x !== value)

    if (checked) {
      nextValue.push(value)
    }

    if (this.props.value === undefined) {
      this.setState({ value: nextValue })
    }

    if (this.props.onChange) {
      this.props.onChange(nextValue)
    }
  }

  render () {
    const {
      className, children, name, options, error,
      value, onChange, disabled, readOnly, ...passedProps
    } = this.props
    const _value = this.state.value

    const optionsList = options.map(obj => (
      <Checkbox
        value={_value.indexOf(obj.value) !== -1}
        disabled={obj.disabled || disabled}
        readOnly={obj.readOnly || readOnly}
        key={obj.value}
        name={name}
        error={error}
        onChange={this.change.bind(this, obj.value)}
      >
        {obj.label}
      </Checkbox>
    ))

    return (
      <div className={buildClassName('checkbox-group', className, { disabled, 'read-only': readOnly })} {...passedProps}>
        {optionsList}
      </div>
    )
  }
}

CheckboxGroup.displayName = 'CheckboxGroup'

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default CheckboxGroup
