# Talixo Optional

UI Component which represents Optional

## How to install

Package is available as `@talixo/optional` in NPM registry, so you can use it in your project
using `npm install @talixo/optional --save` or `yarn add @talixo/optional`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/checkbox: ^1.0.0-alpha.30`
- `@talixo/shared: ^1.0.0-alpha.30`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/optional`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type             | Default | Description                    
--------------|------------------|:-------:|--------------------------------
className     | string           | n/a     | additional class name passed to wrapper
disabled      | boolean          | n/a     | disable optional component
readOnly      | boolean          | n/a     | set optional component to read-only state
label         | string           | n/a     | label to display
id            | string           | n/a     | id of form field
name          | string           | n/a     | name of form field
onChange      | function         | n/a     | send value to parent component
value         | *                | n/a     | input value
children      | node             | n/a     | form element which should be treat as optional

## Changelog

- **0.1.0** - initial version
