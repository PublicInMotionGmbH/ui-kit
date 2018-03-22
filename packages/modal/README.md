# Talixo Modal

UI kit modal component

## How to install

Package is available as `@talixo/modal` in NPM registry, so you can use it in your project
using `npm install @talixo/modal --save` or `yarn add @talixo/modal`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/modal`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `input[type=checkbox]`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | string    | n/a     | content of modal
isOpen        | string    | `true`  | controls whether modal is open
size          | string    | n/a     | size of the modal ('small', 'medium', 'large')
style         | object    | n/a     | additional styles passed to wrapper

## Changelog

- **1.0.0** - initial version
