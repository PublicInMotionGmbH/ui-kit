# Talixo Text Input

UI Component which represents Text Input

## How to install

Package is available as `@talixo/text-input` in NPM registry, so you can use it in your project
using `npm install @talixo/text-input --save` or `yarn add @talixo/text-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/text-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props
It allows any props which are allowed for `input[type=text]`. Additionally, it handles some differently:

Property name  | Type      | Default   | Description
---------------|-----------|:---------:|--------------------------------
className      | string    | n/a       | additional class name passed to wrapper
error          | bool      | `false`   | indicates that input has error
onChange       | function  | n/a       | callback for change event
style          | object    | n/a       | additional input wrapper styling
left           | node      | n/a       | icon/element to put on starting side
right          | node      | n/a       | icon/element to put on ending side
suffix         | node      | n/a       | element or text to show after current input value
InputComponent | component | `'input'` | component used for input below

## Changelog

- **0.2.0** - add possibility to pass `InputComponent`
- **0.1.0** - initial version
