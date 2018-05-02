# Talixo Checkbox 

It's just simple wrapper for checkbox.

## How to install

Package is available as `@talixo/checkbox` in NPM registry, so you can use it in your project
using `npm install @talixo/checkbox --save` or `yarn add @talixo/checkbox`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/checkbox`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `input[type=checkbox]`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | Checkbox description
size          | string    | n/a     | checkbox label size ('small' or 'large')
style         | object    | n/a     | additional styles


## Changelog

- **0.1.0** - initial version
