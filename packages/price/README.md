# Talixo Price

UI Component which represents Price

## How to install

Package is available as `@talixo/price` in NPM registry, so you can use it in your project
using `npm install @talixo/price --save` or `yarn add @talixo/price`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/price`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name     | Type            | Default | Description                    
------------------|-----------------|:-------:|--------------------------------------------------------------
className         | string          | n/a     | Additional class name passed to wrapper.
currency          | string          | n/a     | Currency of a price.
currencyToSymbol  | object          | n/a     | Mapping which provides will be used to convert currency to provided symbol.
displayBefore     | boolean         | `false` | Should the currency be displayed before price?
errorPlaceholder  | node            | `-`     | This placeholder is displayed if provided value is not a number (isNaN returns true).
locale            | string          | n/a     | Locale code of user.
precision         | number          | `2`     | Price precision.
prefix            | node            | n/a     | Prefix which will be displayed before the price. Can be to e.g. indicate that price is approximate.
value             | string / number | n/a     | Given price.

## Changelog

- **0.1.0** - initial version
