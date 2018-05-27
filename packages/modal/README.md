# Talixo Modal

UI Kit modal component. It can be used as a wrapper that shows provided content above the rest of a page

## How to install

Package is available as `@talixo/modal` in NPM registry, so you can use it in your project
using `npm install @talixo/modal --save` or `yarn add @talixo/modal`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/portal: ^0.1.0`
- `@talixo/shared: ^0.1.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/modal`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | string    | n/a     | content of modal
open          | bool      | `true`  | controls whether modal is open

## Changelog

- **0.1.0** - initial version
