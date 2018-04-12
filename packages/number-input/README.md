# Talixo NumberInput

UI Component which represents number input with increment and decrement buttons

## How to install

Package is available as `@talixo/number-input` in NPM registry, so you can use it in your project
using `npm install @talixo/number-input --save` or `yarn add @talixo/number-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/number-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `input[type="number"]`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed of input
hasError      | boolean   | `false` | indicates that input has error
size          | string    | n/a     | size of input (can be 'small')
style         | object    | n/a     | additional styling of wrapper
value         | number    | `0`     | initial input value

## Changelog

- **1.0.0** - initial version
