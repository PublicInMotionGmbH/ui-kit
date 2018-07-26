# Talixo Credit Card

UI Component which represents Credit Card

## How to install

Package is available as `@talixo/credit-card` in NPM registry, so you can use it in your project
using `npm install @talixo/credit-card --save` or `yarn add @talixo/credit-card`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/combo-box: ^1.0.0-alpha.18`
- `@talixo/device-swap: ^1.0.0-alpha.18`
- `@talixo/form: ^1.0.0-alpha.18`
- `@talixo/icon: ^1.0.0-alpha.18`
- `@talixo/shared: ^1.0.0-alpha.18`
- `@talixo/text-input: ^1.0.0-alpha.18`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-text-mask: 5.4.1`

These packages are required by `@talixo/credit-card`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### CreditCardInput

Property name           | Type        | Default              | Description                    
------------------------|-------------|:--------------------:|--------------------------------
cardHolderNameLabel     | string      | `'Name on card*'`    | Label for card holder name input.
cardNumberLabel         | string      | `'Card number*'`     | Label for card number input.
cardExpirationDateLabel | string      | `'Expiration date*'` | Label for card expiration date input.
className               | string      | n/a                  | Additional class name passed to wrapper.
cvcLabel                | string      | `'CVC*'`             | Label for cvc input.
header                  | node        | `'Payment'`          | Form header.
onBlur                  | function    | n/a                  | Handler for onBlur event.
onChange                | function    | n/a                  | Handler for onChange event.
onFocus                 | function    | n/a                  | Handler for onFocus event.
values                  | ValuesShape | `''|null`            | Values to be displayed inside inputs.
mobileFriendly          | bool        | `false`              | Should it show native select boxes for expiration date on mobile?

### CreditCardNumberInput

It allows also properties of [TextInput](../text-input/README.md).

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
onBlur        | function  | n/a     | Handler for onBlur event.
onChange      | function  | n/a     | Handler for onChange event.
onFocus       | function  | n/a     | Handler for onFocus event.
value         | string    | n/a     | Value to be displayed inside inputs.

### CvcInput

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to input.
onBlur        | function  | n/a     | Handler for onBlur event.
onChange      | function  | n/a     | Handler for onChange event.
onFocus       | function  | n/a     | Handler for onFocus event.
value         | string    | n/a     | Value to be displayed inside input.

### ExpirationDateInput

It allows also properties of `div`.

Property name  | Type            | Default | Description                    
---------------|-----------------|:-------:|--------------------------------
className      | string          | n/a     | Additional class name passed to wrapper.
onChange       | function        | n/a     | Handler for onChange event.
value          | ExpirationShape | n/a     | Value to be displayed inside inputs.
error          | bool            | `false` | Does it have any error?
mobileFriendly | bool            | `false` | Should it show native select boxes on mobile?

## Property shapes

### ValuesShape

Property name      | Type            | Default | Description
-------------------|-----------------|:-------:|--------------------------------
cardHolderName     | string          | n/a     | Value to be displayed in the card holder name input.
cardNumber         | string          | n/a     | Value to be displayed in the card number input.
cardExpirationDate | ExpirationShape | n/a     | Date to be displayed in the expiration date input.
cvc                | string          | n/a     | Value to be displayed in the cvc input.

### ExpirationShape

Property name | Type   | Default | Description                    
--------------|--------|:-------:|--------------------------------
month         | number | n/a     | Month to be displayed in the month input.
year          | number | n/a     | Year to be displayed in the year input.

## Changelog

- **0.1.0** - initial version
