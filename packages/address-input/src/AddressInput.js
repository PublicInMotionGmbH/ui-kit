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

import Address from './Address'

const moduleName = 'address-input'

function renderAddress (item) {
  return <Address {...item} />
}

const locationProp = {
  /** Address of location. */
  address: PropTypes.string,

  /** Additional information about place. */
  details: PropTypes.string,

  /** Icon displayed next to the address. */
  icon: PropTypes.string,

  /** Metadata of each location. */
  meta: PropTypes.shape({

    /** Description of a place. If provided it will be displayed inside AddressInput. */
    description: PropTypes.string,

    /** Geometrical data of location. */
    geometry: PropTypes.shape({

      /** Geolocation data of a place. */
      locations: PropTypes.shape({

        /** Latitude of a place. */
        lat: PropTypes.number,

        /** Longitude of a place. */
        lng: PropTypes.number
      })
    })
  }),

  /** Place name abbreviation. It can be e.g. IATA code of an airport */
  short: PropTypes.string
}

const propsTypes = {
  /** Additional className passed to wrapper. */
  className: PropTypes.string,

  /** Autocompletes list footer. */
  footer: PropTypes.node,

  /** Mobile view input label. */
  label: PropTypes.string,

  /** Indicates if loader should be displayed inside input. */
  loading: PropTypes.bool,

  /** Location to be displayed inside autocomlete. */
  locations: PropTypes.arrayOf(PropTypes.shape({...locationProp})),

  /** onBlur callback. */
  onBlur: PropTypes.func,

  /** onChange callback. */
  onChange: PropTypes.func,

  /** onFocus callback. */
  onFocus: PropTypes.func,

  /** This function is called when changes input value, at has typed in at least 3 letters.
   * It should be used to load locations from external API.
   */
  onLoadRequest: PropTypes.func,

  /** This function is called when changes input value, at has typed less than 3 letters.
   * It should be used to prevent request to API.
   */
  onStopRequest: PropTypes.func,

  /** AdressInput placeholder. */
  placeholder: PropTypes.string,

  /** Current location value. */
  value: PropTypes.shape({...locationProp})
}

/**
 *
 */
class AddressInput extends React.PureComponent {
  state = {
    inputValue: this.getDescription(this.props.value),
    value: this.props.value || null
  }

  componentWillReceiveProps (props) {
    if (props.value !== this.props.value && props.value !== undefined) {
      this.setState({
        value: props.value
      })
    }
  }

  onInputValueChange (value) {
    const { onLoadRequest, onStopRequest } = this.props
    if (value === this.state.inputValue) {
      return
    }

    this.setState({ inputValue: value })
    this.onChange(null)

    if (value.length < 3) {
      if (onStopRequest) {
        onStopRequest()
      }
      this.load.cancel()
    } else if (onLoadRequest) {
      this.load(value)
    }
  }

  load = debounce(value => {
    this.props.onLoadRequest(value)
  }, 300)

  onChoose (value) {
    this.setState({ focus: false })
    this.onChange(value)
  }

  onChange (value) {
    if (this.props.value === undefined) {
      this.setState({ value })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  focus () {
    this.setState({
      focus: true
    })

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  blur () {
    const state = { focus: false }
    const { locations, onChange, onBlur } = this.props

    // If user types valid location set it as a value
    if (!this.state.value && locations && locations.length) {
      const firstValue = locations[0]

      state.value = firstValue
      state.inputValue = this.getDescription(firstValue)

      if (onChange) {
        onChange(firstValue)
      }
    }

    if (this.state.value) {
      state.inputValue = this.getDescription(this.state.value)
    }

    this.setState(state)

    if (onBlur) {
      onBlur()
    }
  }

  // Clear input and location search. Focus current input if possible.
  onInputClear = () => {
    this.onInputValueChange('')

    if (this.input) {
      this.input.focus()
    }
  }

  onKeyDown = (event) => {
    const { locations } = this.props

    // 'Tab' key
    if (event.which === 9 && locations && locations.length === 1) {
      this.onChange(locations[0])
    }
  }

  getDescription (value) {
    if (value) {
      if (value.meta) {
        return value.meta.description
      } else if (value.address) {
        return value.address
      }
      return ''
    }
  }

  renderDesktop = () => {
    const {
      className, footer, locations, loading, onBlur, onChange, onFocus,
      onLoadRequest, onStopRequest, placeholder, value, ...passedProps
    } = this.props

    // FIXME: pass props down
    return (
      <MaskedInput
        value={this.state.value}
        renderMask={() => <Address {...this.state.value} />}
        {...passedProps}
      >
        <AutoComplete
          openOnFocus
          options={locations}
          onChoose={this.onChange.bind(this)}
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          renderItem={renderAddress}
          inputValue={this.state.inputValue}
          onInputValueChange={this.onInputValueChange.bind(this)}
          itemToString={x => x == null ? '' : this.getDescription(x)}
          footer={footer}
        >
          <TextInput
            data-hj-whitelist
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

  getMobileInputRef = (node) => {
    this.input = findDOMNode(node)
  }

  renderMobile = () => {
    const { footer, label, locations, loading, placeholder } = this.props
    const fakeCls = buildClassName([moduleName, 'fake-input'])
    const transitionCls = buildClassName([moduleName, 'transition'])
    const mobileModal = buildClassName([moduleName, 'mobile-modal'])
    const mobileModalHeader = buildClassName([moduleName, 'mobile-modal-header'])

    return (
      <div>
        <div className={fakeCls} onClick={this.focus.bind(this)}>
          { this.state.value && <Address {...this.state.value} onClick={this.focus.bind(this)} /> }
        </div>
        <TransitionGroup>
          {
            this.state.focus &&
            <CSSTransition
              classNames={transitionCls}
              timeout={200}
            >
              <div className={mobileModal}>
                <div className={mobileModalHeader}>
                  <div>{label}</div>
                  <Button small onClick={this.blur.bind(this)}>Close</Button>
                </div>
                <AutoComplete
                  openOnFocus
                  isOpen
                  options={locations}
                  onChoose={this.onChoose.bind(this)}
                  onFocus={this.focus.bind(this)}
                  renderItem={renderAddress}
                  inputValue={this.state.inputValue}
                  onInputValueChange={this.onInputValueChange.bind(this)}
                  itemToString={x => x == null ? '' : this.getDescription(x)}
                  footer={footer}
                >
                  <TextInput
                    data-hj-whitelist
                    autoComplete='nope'
                    spellCheck='false'
                    onKeyDown={this.onKeyDown}
                    placeholder={placeholder}
                    right={loading ? <ProgressRing /> : <Icon name='clear' onClick={this.onInputClear} />}
                    inputRef={this.getMobileInputRef}
                    autoFocus
                  />
                </AutoComplete>
              </div>
            </CSSTransition>
          }
        </TransitionGroup>
      </div>
    )
  }

  render () {
    const { className } = this.props

    const clsName = buildClassName(moduleName, className, {
      focused: this.state.focus
    })

    return (
      <div className={clsName}>
        <DeviceSwap
          renderDesktop={this.renderDesktop}
          renderMobile={this.renderMobile}
        />
      </div>
    )
  }
}

AddressInput.propsTypes = propsTypes

export default AddressInput
