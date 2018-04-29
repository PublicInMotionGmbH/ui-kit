import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'

import { buildClassName } from '@talixo/shared'

import isEvent from '../utils/isEvent'
import Menu from './Menu'

const moduleName = 'combo-box'

/**
 * Compose props together
 *
 * @param {...object} props
 * @returns {object}
 */
function composeProps (...props) {
  const result = { ...props.shift() }

  for (let i = 0; i < props.length; i++) {
    const x = props[i]

    for (const key in x) {
      if (typeof result[key] === 'function') {
        if (typeof x[key] !== 'function') {
          continue
        }

        const previousHandler = result[key]
        const nextHandler = x[key]

        result[key] = (...args) => {
          previousHandler(...args)
          return nextHandler(...args)
        }
      } else {
        result[key] = x[key]
      }
    }
  }

  return result
}

/**
 * Build a function to get input props.
 *
 * @param {object} downshift
 * @param {object} [additionalProps]
 * @returns {function}
 */
function composeInputProps (downshift, additionalProps) {
  return props => {
    // Copy props which are passed directly to Input
    const inputProps = composeProps(props, additionalProps)

    // Extract input 'change' event handler
    const onChange = inputProps.onChange
    delete inputProps.onChange

    // Build props using Downshift (excluding onChange)
    const nextProps = downshift.getInputProps(inputProps)

    // Replace 'value' if input is controlled by itself
    if ('value' in props) {
      nextProps.value = props.value
    }

    // Extract 'change' handler of Downshift
    const downshiftOnChange = nextProps.onChange

    // Build new 'change' handler, which will correctly use value
    // And pass it to Downshift always as pseudo-event
    nextProps.onChange = (...args) => {
      // Call 'change' event handler from input if exists
      if (onChange) {
        onChange(...args)
      }

      // Get (Synthetic)Event from arguments or build a pseudo-event object
      const event = isEvent(args[0]) ? args[0] : {
        target: {
          value: args[0]
        }
      }

      // Call Downshift 'change' event handler
      downshiftOnChange(event)
    }

    return nextProps
  }
}

/**
 * Component which represents Combo box.
 *
 * @property {object} props
 * @property {array} props.options
 * @property {boolean} props.multi
 * @property {function} props.renderItem
 * @property {function} props.buildItemId
 * @property {function} props.itemToString
 * @property {*} [props.placeholder]
 * @property {function} [props.renderValue]
 * @property {string} [props.className]
 *
 * @class
 */
class AutoComplete extends React.PureComponent {
  /**
   * Get props which should be passed through our components below Downshift.
   *
   * @param {object} data
   * @returns {object}
   */
  getStateProps (data) {
    const { icon, options, buildItemId, renderItem, onFocus, onBlur } = this.props

    // Compose function to get input props
    const getInputProps = composeInputProps(data, { onFocus, onBlur })

    return {
      ...data,
      ...{ icon, options, buildItemId, renderItem, getInputProps }
    }
  }

  /**
   * Handle item (un)selection.
   *
   * @param {object} item
   */
  select (item) {
    const { onChoose } = this.props

    // Handle simple selection for single select-box
    if (onChoose) {
      onChoose(item)
    }
  }

  /**
   * Build external input with correct props.
   *
   * @param {object} data
   */
  buildInput (data) {
    const { children } = this.props
    const { getInputProps } = data

    const input = React.Children.only(children)

    const inputProps = getInputProps(input.props, data)

    return React.cloneElement(input, inputProps)
  }

  /**
   * Render component in Downshift flow.
   *
   * @param {object} _data
   * @returns {React.Element}
   */
  renderComponent (_data) {
    // Compose Downshift & our properties
    const data = this.getStateProps(_data)

    // Get required data to render component
    const { className } = this.props
    const { isOpen, options, icon } = data

    // Check if menu should be visible
    const open = isOpen && options.length > 0

    // Build class name for wrapper
    const clsName = buildClassName(moduleName, className, { open, 'with-info': icon })

    // Build menu component
    const menu = open ? <Menu {...data} /> : null

    // Render component
    return (
      <div className={clsName}>
        {this.buildInput(data)}
        {menu}
      </div>
    )
  }

  /**
   * Render Downshift component with our wrappers.
   *
   * @returns {React.Element}
   */
  render () {
    const {
      icon, options, onChoose, buildItemId, renderItem,
      children, onFocus, onBlur, ...passedProps
    } = this.props

    return (
      <Downshift
        onChange={this.select.bind(this)}
        selectedItem={null}
        {...passedProps}
      >
        {this.renderComponent.bind(this)}
      </Downshift>
    )
  }
}

AutoComplete.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** List of options to show */
  options: PropTypes.array.isRequired,

  /** Event called after current value of combo-box has been changed */
  onChoose: PropTypes.func,

  /** Function to render item */
  renderItem: PropTypes.func,

  /** Function to build item ID - used for 'key' properties */
  buildItemId: PropTypes.func,

  /** Function passed to Downshift to make it working for objects */
  itemToString: PropTypes.func
}

AutoComplete.defaultProps = {
  options: [],
  renderItem: item => item,
  buildItemId: (item, index) => index,
  itemToString: item => item
}

export default AutoComplete
