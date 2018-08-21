# Talixo Masked Input

UI Component which represents Masked Input

## How to install

Package is available as `@talixo/masked-input` in NPM registry, so you can use it in your project
using `npm install @talixo/masked-input --save` or `yarn add @talixo/masked-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/masked-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
onBlur        | function  | n/a     | Event called when input has lost focus.
onChange      | function  | n/a     | Event called when input inside has changed.
onFocus       | function  | n/a     | Event called when input is focused.
children      | node      | n/a     | Input element.
renderMask    | function  | n/a     | Function which returns masking element to render when input is blurred. First argument function is value passed either by parent changing value prop or by children if `props.value` is undefined.
value         | any       | n/a     | Masking element to render when input is blurred.
id            | string    | n/a     | ID passed to control element.
error         | bool      | `false` | Does it have error?

## Changelog

- **0.1.0** - initial version
