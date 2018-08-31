# Talixo Optional

UI Component which represents Optional

## How to install

Package is available as `@talixo/optional` in NPM registry, so you can use it in your project
using `npm install @talixo/optional --save` or `yarn add @talixo/optional`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.27`
- `@talixo/textarea: ^1.0.0-alpha.27`
- `@talixo/checkbox: ^1.0.0-alpha.27`
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
collapsible   | boolean          | n/a     | textarea should collapse or not
disabled      | boolean          | n/a     | disable textarea and checkbox
label         | string           | n/a     | label to display
name          | string           | n/a     | name of form field
open          | boolean          | n/a     | should be open initially when collapsible
onChange      | function         | n/a     | send value to parent component
placeholder   | string           | n/a     | placeholder to display in textarea
readOnly      | boolean          | n/a     | read only textarea
value         | string or number | n/a     | send value to parent component

## Changelog

- **0.1.0** - initial version
