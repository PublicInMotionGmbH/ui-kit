# Talixo Divider

UI Component which represents Divider

## How to install

Package is available as `@talixo/divider` in NPM registry, so you can use it in your project
using `npm install @talixo/divider --save` or `yarn add @talixo/divider`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.4.2`
- `react-dom: ^16.4.2`

These packages are required by `@talixo/divider`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
small         | boolean   | `false` | Changes top and bottom padding of divider to smaller.

## Changelog

- **0.1.0** - initial version
