import React from 'react'
import PropTypes from 'prop-types'

import { TextInput } from '@talixo/text-input'
import { FormHandler, Field } from '@talixo/form'

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

  /** Should it render native select boxes for mobile (expiration date input)? */
  mobileFriendly: PropTypes.bool,

  /** Values to be displayed inside inputs. */
  values: PropTypes.shape({

    /** Card holder name. */
    cardHolderName: PropTypes.string,

    /** Card number. */
    cardNumber: PropTypes.string,

    /** Card expiration date object. */
    cardExpirationDate: PropTypes.shape({

      /** Expiration month. */
      month: PropTypes.number,

      /** Expiration year. */
      year: PropTypes.number
    }),

    /** Cvc number */
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
    cardExpirationDate: null,
    cvc: ''
  },
  mobileFriendly: false
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
  const {
    cardHolderNameLabel, cardNumberLabel, cardExpirationDateLabel, className,
    cvcLabel, header, onBlur, onChange, onFocus, onSubmit, values, mobileFriendly
  } = props

  const formHandlerClsName = buildClassName(moduleName, className)
  const contentClsName = buildClassName([moduleName, 'content'])

  return (
    <FormHandler className={formHandlerClsName} onSubmit={onSubmit} values={values}>
      <legend><h3>{header}</h3></legend>
      <div className={contentClsName}>
        <Field
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
        </Field>
        <Field
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
        </Field>
        <Field
          name='cardExpirationDate'
          label={cardExpirationDateLabel}
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cardExpirationDate')}
          onFocus={onFocus}
          value={values.cardExpirationDate}
        >
          <ExpirationDateInput mobileFriendly={mobileFriendly} />
        </Field>
        <Field
          name='cvc'
          label={cvcLabel}
          onBlur={onBlur}
          onChange={(value) => onChange(value, 'cvc')}
          onFocus={onFocus}
          value={values.cvc}
        >
          <CvcInput />
        </Field>
      </div>
    </FormHandler>
  )
}

CreditCardInput.propTypes = propTypes

CreditCardInput.defaultProps = defaultProps

export default CreditCardInput
