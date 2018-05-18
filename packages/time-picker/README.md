# Talixo Time Picker

UI Component which represents Time Picker. It accepts and returns a time string in 'HH:mm' format.

## How to install

Package is available as `@talixo/time-picker` in NPM registry, so you can use it in your project
using `npm install @talixo/time-picker --save` or `yarn add @talixo/time-picker`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `moment: ^2.22.1`
- `@talixo/shared: ^0.1.0`
- `@talixo/button: ^0.1.0`
- `@talixo/icon": ^0.1.0`
- `@talixo/text-input: ^0.1.0`

These packages are required by `@talixo/time-picker`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### TimePicker

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type         | Default         | Description
--------------|--------------|:---------------:|--------------------------------
className     | string       | n/a             | Additional class name passed to wrapper.
onChange      | function     | n/a             | Event called after input value has been changed.
hourFormat    | `12` or `24` | `24`            | Hour format.
value         | string       | self-controlled | Time string in 'HH:mm' (24h) format passed to component.

## Changelog

- **0.1.0** - initial version