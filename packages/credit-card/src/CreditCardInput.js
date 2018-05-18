import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'
import { FormField } from '@talixo/form-field'

import CreditCardNumberInput from './CreditCardNumberInput'
import ExpirationDateInput from './ExpirationDateInput'

import { buildClassName } from '@talixo/shared'

const moduleName = 'credit-card-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Handler for onBlur event. */
  onBlur: PropTypes.func,

  /** Handler for onChange event. */
  onChange: PropTypes.func,

  /** Handler for onFocus event. */
  onFocus: PropTypes.func,

  /** Value to be displayed inside inputs. */
  value: PropTypes.shape({
    name: PropTypes.number,
    cadrNumber: PropTypes.number,
    expirationDate: PropTypes.number,
    cvc: PropTypes.number
  })
}

const defaultProps = {}

/**
 * Component which represents credit card input.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {func} [props.onBlur]
 * @property {func} [props.onChange]
 * @property {func} [props.onFocus]
 * @property {string} [props.value]
 *
 * @property {object} state
 * @property {object|null} state.value
 * @property {string} state.value.name
 * @property {string} state.value.cadrNumber
 * @property {string} state.value.expirationDate
 * @property {string} state.value.cvc
 *
 * @class
 */
class CreditCardInput extends React.PureComponent {
  state = {
    value: null
  }
  /**
   * Render credit card input component.
   *
   * @returns {React.Element}
   */
  render () {
    const { className } = this.props

    return (
      <fieldset className={buildClassName(moduleName, className)}>
        <legend><h3>Payment</h3></legend>
        <div className={buildClassName([moduleName, 'content'])}>
          <FormField name='cardHolderName' label='Name on card*'>
            <TextInput
              autoComplete='cc-full-name'
            />
          </FormField>
          <FormField name='cardNumber' label='Card number*'>
            <CreditCardNumberInput
              autoComplete='cc-number'
            />
          </FormField>
          <FormField name='cardExpirationDate' label='Expiration date*'>
            <ExpirationDateInput />
          </FormField>
          <FormField name='cvc' label='CVC*'>
            <TextInput
              autoComplete='cc-csc'
              maxLength={4}
              size={4}
            />
          </FormField>
        </div>
      </fieldset>
    )
  }
}

CreditCardInput.propTypes = propTypes

CreditCardInput.defaultProps = defaultProps

export default CreditCardInput
