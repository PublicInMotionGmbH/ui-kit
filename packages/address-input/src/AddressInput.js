import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'

import debounce from 'lodash/debounce'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { AutoComplete } from '@talixo/combo-box'
import { TextInput } from '@talixo/text-input'
import { ProgressRing } from '@talixo/progress-ring'
import { MaskedInput } from '@talixo/masked-input'
import { DeviceSwap } from '@talixo/device-swap'
import { Button } from '@talixo/button'
import { Icon } from '@talixo/icon'
import { buildClassName } from '@talixo/shared'

import { Address } from '@talixo/address'

export const moduleName = 'address-input'

/**
 * Get description either from meta data or from address property of value.
 *
 * @param {object} value
 * @returns {string}
 */
export function getDescription (value) {
  if (value) {
    if (value.meta) {
      return value.meta.description
    } else if (value.address) {
      return value.address
    }
  }

  return ''
}

/**
 * Get string from an object. To use with AutoComplete component.
 *
 * @param {object} item
 *
 * @returns {string}
 */
export function itemToString (item) {
  return item == null ? '' : getDescription(item)
}

/**
 *
 * @param {object} props
 * @param {string} [props.address]
 * @param {string} [props.className]
 * @param {string} [props.details]
 * @param {function} [props.formatDetails]
 * @param {string} [props.type]
 * @param {string} [props.short]
 *
 * @returns {React.Element}
 */
function _renderAddress (props) {
  const { address, details, formatDetails, type, short } = props

  return React.createElement(Address, {
    address, details, formatDetails, type, short
  })
}

const locationProp = {
  /** Address of location. */
  address: PropTypes.string,

  /** Additional information about place. */
  details: PropTypes.string,

  /** Icon displayed next to the address. */
  type: PropTypes.string,

  /** Metadata of location. */
  meta: PropTypes.shape({
    /** Description of a place. If provided it will be displayed inside AddressInput. */
    description: PropTypes.string
  }),

  /** Place name abbreviation. It can be e.g. IATA code of an airport. */
  short: PropTypes.string
}

const propTypes = {
  /** Additional className passed to wrapper. */
  className: PropTypes.string,

  /** AutoComplete list footer. */
  footer: PropTypes.node,

  /** Mobile view input label. */
  label: PropTypes.string,

  /** Indicates if loader should be displayed inside input. */
  loading: PropTypes.bool,

  /** Locations to be displayed inside AutoComlete. */
  locations: PropTypes.arrayOf(PropTypes.shape(locationProp)),

  /** onBlur callback. */
  onBlur: PropTypes.func,

  /** onChange callback. */
  onChange: PropTypes.func,

  /** onFocus callback. */
  onFocus: PropTypes.func,

  /**
   * This function is called when changes input value, at has typed in at least 3 (minLetters) letters.
   * It should be used to load locations from external API.
   */
  onLoadRequest: PropTypes.func,

  /**
   * This function is called when changes input value, at has typed less than 3 (minLetters) letters.
   * It should be used to prevent request to API.
   */
  onStopRequest: PropTypes.func,

  /** Minimum number of letters to run load/stop helpers */
  minLetters: PropTypes.number,

  /** Delay time for writing message */
  writingDelay: PropTypes.number,

  /** AddressInput placeholder. */
  placeholder: PropTypes.string,

  /** Address component which will be displayed inside autocomplete list. */
  renderAddress: PropTypes.func,

  /** Chosen location value. */
  value: PropTypes.shape(locationProp),

  /** Should it be optimized for mobile? */
  mobileFriendly: PropTypes.bool
}

const defaultProps = {
  renderAddress: _renderAddress,
  mobileFriendly: true,
  minLetters: 3,
  writingDelay: 300
}

/**
 * Component which represents AddressInput.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.footer]
 * @property {string} [props.label]
 * @property {boolean} [props.loading]
 * @property {Array<{ [address]: string, [details]: string, [type]: string, [meta]: { [description]: string }, [short]: string}>} [props.locations]
 * @property {function} [props.onBlur]
 * @property {function} [props.onChange]
 * @property {function} [props.onFocus]
 * @property {function} [props.onLoadRequest]
 * @property {function} [props.onStopRequest]
 * @property {function} [props.placeholder]
 * @property {function} [props.renderAddress]
 *
 * @property {object} [props.value]
 * @property {string} [props.value.address]
 * @property {string} [props.value.details]
 * @property {string} [props.value.icon]
 * @property {object} [props.value.meta]
 * @property {string} [props.value.meta.description]
 * @property {string} [props.value.short]
 *
 * @property {string} state
 * @property {string} state.inputValue
 * @property {object} state.value
 *
 * @class
 */
class AddressInput extends React.PureComponent {
  state = {
    inputValue: getDescription(this.props.value),
    value: this.props.value || null
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.props.value && props.value !== undefined) {
      const state = { value: props.value }

      if (props.value) {
        state.inputValue = getDescription(props.value)
      }

      this.setState(state)
    }
  }

  /**
   * Handle user typing.
   *
   * @param {string} value
   */
  onInputValueChange = value => {
    const { onLoadRequest, onStopRequest, minLetters } = this.props

    if (value === this.state.inputValue) {
      return
    }

    this.setState({ inputValue: value })
    this.onChange(null)

    // Invoke find request only when at least 3 chars are provided.
    if (value.length < minLetters) {
      this.load.cancel()

      if (onStopRequest) {
        onStopRequest()
      }
    } else if (onLoadRequest) {
      this.load(value)
    }
  }

  /**
   *
   * @type {Function}
   */
  load = debounce(value => {
    this.props.onLoadRequest(value)
  }, this.props.writingDelay)

  /**
   * Handle choosing element from the autocomplete list on mobile devices.
   *
   * @param {object} value
   */
  onChoose = value => {
    this.setState({ focus: false })
    this.onChange(value)
    this.input.blur()
  }

  /**
   * Handle choosing element from autocomplete list.
   * @param value
   */
  onChange = value => {
    if (this.props.value === undefined) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  /**
   * Handle input focusing.
   */
  focus = () => {
    this.setState({
      focus: true
    })

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  /**
   * Handle input blur event.
   */
  blur = () => {
    const state = { focus: false }
    const { locations, onChange, onBlur } = this.props

    // If user types valid location set it as a value
    if (!this.state.value && locations && locations.length) {
      const firstValue = locations[0]

      state.value = firstValue
      state.inputValue = getDescription(firstValue)

      if (onChange) {
        onChange(firstValue)
      }
    }

    // Set proper search query to input.
    if (this.state.value) {
      state.inputValue = getDescription(this.state.value)
    }

    this.setState(state)

    if (onBlur) {
      onBlur()
    }
  }

  /**
   * Clear input and location search. Focus current input if possible.
   */
  onInputClear = () => {
    this.onInputValueChange('')

    if (this.input) {
      this.input.focus()
    }
  }

  /**
   * Handle tab pressing. It will set first location as value if locations array is provided.
   * @param {Event|SyntheticEvent} event
   */
  onKeyDown = (event) => {
    const { locations } = this.props

    // 'Tab' key
    if (event.which === 9 && locations && locations.length === 1) {
      this.onChange(locations[0])
    }
  }

  /**
   * Get reference to mobile version of AddressInput
   *
   * @param {HTMLElement} node
   */
  setInputRef = (node) => {
    this.input = findDOMNode(node)
  }

  /**
   * Render desktop version of AddressInput.
   *
   * @returns {React.Element}
   */
  renderDesktop = () => {
    const {
      className, footer, locations, loading, onBlur, onChange, onFocus, writingDelay,
      onLoadRequest, onStopRequest, placeholder, renderAddress, value, minLetters, mobileFriendly,
      ...passedProps
    } = this.props

    // FIXME: pass props down
    return (
      <MaskedInput
        value={this.state.value}
        renderMask={() => renderAddress(this.state.value)}
        {...passedProps}
      >
        <AutoComplete
          openOnFocus
          options={locations}
          onChoose={this.onChoose}
          onFocus={this.focus}
          onBlur={this.blur}
          renderItem={renderAddress}
          inputValue={this.state.inputValue}
          onInputValueChange={this.onInputValueChange}
          itemToString={itemToString}
          footer={footer}
        >
          <TextInput
            inputRef={this.setInputRef}
            autoComplete='nope'
            spellCheck='false'
            onKeyDown={this.onKeyDown}
            placeholder={placeholder}
            right={loading ? <ProgressRing /> : null}
          />
        </AutoComplete>
      </MaskedInput>
    )
  }

  /**
   * Render mobile version of AddressInput.
   *
   * @returns {*}
   */
  renderMobile = () => {
    const { footer, label, locations, loading, placeholder, renderAddress } = this.props
    const fakeCls = buildClassName([moduleName, 'fake-input'])
    const transitionCls = buildClassName([moduleName, 'transition'])
    const mobileModal = buildClassName([moduleName, 'mobile-modal'])
    const mobileModalHeader = buildClassName([moduleName, 'mobile-modal-header'])

    const renderAddressProps = { ...this.state.value }

    const input = this.state.focus ? (
      <CSSTransition
        classNames={transitionCls}
        timeout={200}
      >
        <div className={mobileModal}>
          <div className={mobileModalHeader}>
            <div>{label}</div>
            <Button small onClick={this.blur}>Close</Button>
          </div>
          <AutoComplete
            openOnFocus
            isOpen
            options={locations}
            onChoose={this.onChoose}
            onFocus={this.focus}
            renderItem={renderAddress}
            inputValue={this.state.inputValue}
            onInputValueChange={this.onInputValueChange}
            itemToString={itemToString}
            footer={footer}
          >
            <TextInput
              autoComplete='nope'
              spellCheck='false'
              onKeyDown={this.onKeyDown}
              placeholder={placeholder}
              right={loading ? <ProgressRing /> : <Icon name='clear' onClick={this.onInputClear} />}
              inputRef={this.setInputRef}
              autoFocus
            />
          </AutoComplete>
        </div>
      </CSSTransition>
    ) : null

    return (
      <div>
        <div className={fakeCls} onClick={this.focus}>
          {this.state.value ? renderAddress(renderAddressProps) : placeholder}
        </div>
        <TransitionGroup>
          {input}
        </TransitionGroup>
      </div>
    )
  }

  render () {
    const { className, mobileFriendly } = this.props

    const clsName = buildClassName(moduleName, className, {
      focused: this.state.focus
    })

    const input = mobileFriendly ? (
      <DeviceSwap
        renderDesktop={this.renderDesktop}
        renderMobile={this.renderMobile}
      />
    ) : this.renderDesktop()

    return (
      <div className={clsName}>
        {input}
      </div>
    )
  }
}

AddressInput.displayName = 'AddressInput'

AddressInput.propTypes = propTypes
AddressInput.defaultProps = defaultProps

export default AddressInput
