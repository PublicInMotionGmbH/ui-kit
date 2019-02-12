# Talixo Columns

UI Component which represents Columns

## How to install

Package is available as `@talixo/columns` in NPM registry, so you can use it in your project
using `npm install @talixo/columns --save` or `yarn add @talixo/columns`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/columns`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Columns
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | content to display in component
maxColumns    | number    | n/a     | max columns number in row

### ColumnsElement
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | content to display in component
maxColumns    | number    | n/a     | max columns number in row
icon          | node      | n/a     | icon in header with indent content

## Changelog

- **0.1.0** - initial version
