# Talixo Number Input

UI Component which represents number input with increment and decrement buttons

## How to install

Package is available as `@talixo/number-input` in NPM registry, so you can use it in your project
using `npm install @talixo/number-input --save` or `yarn add @talixo/number-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.20`
- `@talixo/shared: ^1.0.0-alpha.20`
- `@talixo/text-input: ^1.0.0-alpha.20`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/number-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `TextInput` (`@talixo/text-input`) or `input[type="number"]`. Additionally, it handles some differently:

Property name | Type      | Default         | Description
--------------|-----------|:---------------:|--------------------------------
className     | string    | n/a             | additional class name passed to wrapper
stepper       | boolean   | `true`          | should stepper buttons be visible?
error         | boolean   | `false`         | indicates that input has error
style         | object    | n/a             | additional styling of wrapper
value         | number    | self-controlled | input value
min           | number    | `-Infinity`     | minimum number to set inside
max           | number    | `Infinity`      | maximum number to set inside
step          | number    | `1`             | step value for mouse whell, keyboard and buttons
precision     | number    | `0`             | number of decimal places
initialTime   | number    | `700`           | initial time to automatically de/increment when button is pressed
stepTime      | number    | `20`            | time for each automated de/increment when button is pressed
disabled      | bool      | `false`         | Should it be disabled?
readOnly      | bool      | `false`         | Should it be read-only?

## Changelog

- **0.1.0** - initial version
