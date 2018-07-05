import React from 'react'
import PropTypes from 'prop-types'

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
  value: PropTypes.any
}

const defaultProps = {
  error: false
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

/**
 * Component which represents CheckboxGroup.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {string} [props.name]
 * @property {array} [props.options]
 * @property {string} [props.size]
 * @property {array} [props.value]
 * @class
 */
class CheckboxGroup extends React.PureComponent {
  state = {
    value: buildValue(this.props.value, this.props.options)
  }

  componentWillReceiveProps (props) {
    if (props.value !== undefined && props.value !== this.props.value) {
      const nextValue = buildValue(props.value, props.options)

      if (!isSameList(this.state.value, nextValue)) {
        this.setState({
          value: nextValue
        })
      }
    } else if (props.options !== this.props.options) {
      const nextValue = buildValue(this.state.value, props.options)

      if (!isSameList(this.state.value, nextValue)) {
        this.setState({
          value: nextValue
        })
      }
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
    const { className, children, name, options, error, value, onChange, ...passedProps } = this.props
    const _value = this.state.value

    const optionsList = options.map(obj => (
      <Checkbox
        value={_value.indexOf(obj.value) !== -1}
        disabled={obj.disabled || false}
        key={obj.value}
        name={name}
        error={error}
        onChange={this.change.bind(this, obj.value)}
      >
        {obj.label}
      </Checkbox>
    ))

    return (
      <div className={buildClassName('checkbox-group', className)} {...passedProps} >
        {optionsList}
      </div>
    )
  }
}

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default CheckboxGroup
