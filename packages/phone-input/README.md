# Talixo PhoneInput

UI component which represents input to provided phone number

## How to install

Package is available as `@talixo/phone-input` in NPM registry, so you can use it in your project
using `npm install @talixo/phone-input --save` or `yarn add @talixo/phone-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-text-mask: ^5.4.1`
- `country-telephone-data: ^0.5.5`
- `@talixo/shared: ^0.1.0`
- `@talixo/country-flag: ^0.1.0`
- `@talixo/combo-box: ^0.1.0`

These packages are required by `@talixo/phone-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

This component allows any properties which can be added to `div` element. Additionally, handles some differently:

Property name | Type      | Default         | Description
--------------|-----------|:---------------:|--------------------------------
className     | string    | n/a             | additional class name passed to wrapper
value         | string    | self-controlled | phone number to show
placeholder   | string    | n/a             | placeholder to show when there is no value
onChange      | function  | n/a             | event handler for changed value
onFocus       | function  | n/a             | event handler fired when input has been focused
onBlur        | function  | n/a             | event handler fired when input lost focus

## Changelog

- **0.1.0** - initial version
