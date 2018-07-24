# Talixo Slider

UI Component which represents Slider

## How to install

Package is available as `@talixo/slider` in NPM registry, so you can use it in your project
using `npm install @talixo/slider --save` or `yarn add @talixo/slider`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.16`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/slider`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default         | Description
--------------|-----------|:---------------:|--------------------------------
className     | string    | n/a             | additional class name passed to wrapper
value         | number    | self-controlled | value of input
max           | number    | n/a             | maximum value in range
min           | number    | n/a             | minimum value in range
step          | number    | n/a             | size of each movement of the slider control
onFocus       | function  | n/a             | event handler when input is focused
onBlur        | function  | n/a             | event handler when input lost focus
onChange      | function  | n/a             | event handler when input is changed, with new value
id            | string    | n/a             | ID passed to control element

## Changelog

- **0.1.0** - initial version
