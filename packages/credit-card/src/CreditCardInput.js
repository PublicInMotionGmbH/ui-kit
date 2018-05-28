import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'
import { FormField } from '@talixo/form-field'
import { FormHandler } from '@talixo/form-handler'

import { buildClassName } from '@talixo/shared'

import CreditCardNumberInput from './CreditCardNumberInput'
import CvcInput from './CvcInput'
import ExpirationDateInput from './ExpirationDateInput'

const moduleName = 'credit-card-input'

const propTypes = {
  /** Label for card holder name input. */
  cardHolderNameLabel: PropTypes.string,

  /** Label for card number input. */
  cardNumberLabel: PropTypes.string,

  /** Label for card expiration date input. */
  cardExpirationDateLabel: PropTypes.string,

  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Label for cvc input. */
  cvcLabel: PropTypes.string,

  /** Form header. */
  header: PropTypes.node,

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
  cardHolderNameLabel: 'Name on card*',
  cardNumberLabel: 'Card number*',
  cardExpirationDateLabel: 'Expiration date*',
  cvcLabel: 'CVC*',
  header: 'Payment',
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
 * @param {string} [props.cardHolderNameLabel]
 * @param {string} [props.cardNumberLabel]
 * @param {string} [props.cardExpirationDateLabel]
 * @param {string} [props.className]
 * @param {string} [props.cvcLabel]
 * @param {func} [props.onBlur]
 * @param {func} [props.onChange]
 * @param {func} [props.onFocus]
 * @param {func} [props.onSubmit]
 * @param {string} [props.values]
 *
 * @returns {React.Element}
 */
function CreditCardInput (props) {
  const { cardHolderNameLabel, cardNumberLabel, cardExpirationDateLabel, className, cvcLabel, header, onBlur, onChange, onFocus, onSubmit, values } = props

  const formhandlerClsName = buildClassName(moduleName, className)
  const contentClsName = buildClassName([moduleName, 'content'])

  return (
    <FormHandler className={formhandlerClsName} onSubmit={onSubmit} values={values}>
      <legend><h3>{header}</h3></legend>
      <div className={contentClsName}>
        <FormField
          name='cardHolderName'
          label={cardHolderNameLabel}
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
          label={cardNumberLabel}
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
          label={cardExpirationDateLabel}
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cardExpirationDate')}
          onFocus={onFocus}
          value={values.cardExpirationDate}
        >
          <ExpirationDateInput />
        </FormField>
        <FormField
          name='cvc'
          label={cvcLabel}
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cvc')}
          onFocus={onFocus}
          value={values.cvc}
        >
          <CvcInput />
        </FormField>
      </div>
    </FormHandler>
  )
}

CreditCardInput.propTypes = propTypes

CreditCardInput.defaultProps = defaultProps

export default CreditCardInput
