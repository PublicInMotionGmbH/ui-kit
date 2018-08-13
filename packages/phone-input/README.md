# Talixo PhoneInput

UI component which represents input to provided phone number

## How to install

Package is available as `@talixo/phone-input` in NPM registry, so you can use it in your project
using `npm install @talixo/phone-input --save` or `yarn add @talixo/phone-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/combo-box: ^1.0.0-alpha.24`
- `@talixo/country-flag: ^1.0.0-alpha.24`
- `@talixo/shared: ^1.0.0-alpha.24`
- `country-telephone-data: ^0.5.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-text-mask: 5.4.1`

These packages are required by `@talixo/phone-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## How to use this component with country flags

- If you want to use package with country flags you need to use `CountryFlagsProvider`
- Sprite is available in `sprites/sprite.svg` directory

To see how to use country flags package please see https://github.com/PublicInMotionGmbH/ui-kit/tree/master/packages/country-flag

## Supported props

This component allows any properties which can be added to `div` element. Additionally, handles some differently:

Property name | Type      | Default         | Description
--------------|-----------|:---------------:|--------------------------------
autoComplete  | string    | `off`           | additional class name passed to wrapper
className     | string    | n/a             | additional class name passed to wrapper
error         | boolean   | `false`         | indicates that input has error
value         | string    | self-controlled | phone number to show
placeholder   | string    | n/a             | placeholder to show when there is no value
onChange      | function  | n/a             | event handler for changed value
onFocus       | function  | n/a             | event handler fired when input has been focused
onBlur        | function  | n/a             | event handler fired when input lost focus
id            | string    | n/a             | ID passed to control element
disabled      | bool      | `false`         | Should it be disabled?
readOnly      | bool      | `false`         | Should it be read-only?

## Changelog

- **0.2.0** - add mask for country prefix
- **0.1.0** - initial version
