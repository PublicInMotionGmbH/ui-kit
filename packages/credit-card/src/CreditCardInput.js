import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'
import { FormField } from '@talixo/form-field'
import { FormHandler } from '@talixo/form-handler'

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

  /** Handler for onSubmit event. */
  onSubmit: PropTypes.func,

  /** Values to be displayed inside inputs. */
  values: PropTypes.shape({
    cardHolderName: PropTypes.string,
    cardNumber: PropTypes.string,
    cardExpirationDate: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number
    }),
    cvc: PropTypes.string
  })
}

const defaultProps = {
  values: {
    cardHolderName: '',
    cardNumber: '',
    cardExpirationDate: {
      month: null,
      year: null
    },
    cvc: ''
  }
}

/**
 * Component which represents credit card input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {func} [props.onBlur]
 * @param {func} [props.onChange]
 * @param {func} [props.onFocus]
 * @param {func} [props.onSubmit]
 * @param {string} [props.value]
 *
 * @returns {React.Element}
 */
function CreditCardInput (props) {
  const { className, onBlur, onChange, onFocus, onSubmit, values } = props

  return (
    <FormHandler className={buildClassName(moduleName, className)} onSubmit={onSubmit} values={values}>
      <legend><h3>Payment</h3></legend>
      <div className={buildClassName([moduleName, 'content'])}>
        <FormField
          name='cardHolderName'
          label='Name on card*'
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cardHolderName')}
          onFocus={onFocus}
          value={values.cardHolderName}
        >
          <TextInput
            autoComplete='cc-full-name'
          />
        </FormField>
        <FormField
          name='cardNumber'
          label='Card number*'
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cardNumber')}
          onFocus={onFocus}
          value={values.cardNumber}
        >
          <CreditCardNumberInput
            autoComplete='cc-number'
          />
        </FormField>
        <FormField
          name='cardExpirationDate'
          label='Expiration date*'
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cardExpirationDate')}
          onFocus={onFocus}
          value={values.cardExpirationDate}
        >
          <ExpirationDateInput />
        </FormField>
        <FormField
          name='cvc'
          label='CVC*'
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cvc')}
          onFocus={onFocus}
          value={values.cvc}
        >
          <TextInput
            autoComplete='cc-csc'
            maxLength={4}
            size={4}
          />
        </FormField>
      </div>
    </FormHandler>
  )
}

CreditCardInput.propTypes = propTypes

CreditCardInput.defaultProps = defaultProps

export default CreditCardInput
