# Talixo Time Picker

UI Component which represents Time Picker. It accepts and returns a time string in 'HH:mm' format.

## How to install

Package is available as `@talixo/time-picker` in NPM registry, so you can use it in your project
using `npm install @talixo/time-picker --save` or `yarn add @talixo/time-picker`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/button: ^1.0.0-alpha.31`
- `@talixo/device-swap: ^1.0.0-alpha.31`
- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `@talixo/text-input: ^1.0.0-alpha.31`
- `moment: ^2.22.1`
- `prop-types: ^15.6.1`
- `react: ^16.4.2`
- `react-dom: ^16.4.2`

These packages are required by `@talixo/time-picker`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### TimePicker

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name  | Type         | Default         | Description
---------------|--------------|:---------------:|--------------------------------
className      | string       | n/a             | Additional class name passed to wrapper.
onChange       | function     | n/a             | Event called after input value has been changed.
hourFormat     | `12` or `24` | `24`            | Hour format.
value          | string       | self-controlled | Time string in 'HH:mm' (24h) format passed to component.
id             | string       | n/a             | ID passed to control element
error          | bool         | `false`         | Style component like it has errors.
mobileFriendly | bool         | `false`         | Should it render native time picker on mobile?
disabled       | bool         | `false`         | Should it be disabled?
readOnly       | bool         | `false`         | Should it be read-only?

## Changelog

- **0.1.0** - initial version
