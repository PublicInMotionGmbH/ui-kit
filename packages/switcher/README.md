# Talixo Switcher

It's just simple wrapper for checkbox, which behaves more like switcher with Yes/No options.

## How to install

Package is available as `@talixo/switcher` in NPM registry, so you can use it in your project
using `npm install @talixo/switcher --save` or `yarn add @talixo/switcher`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.4.2`
- `react-dom: ^16.4.2`

These packages are required by `@talixo/switcher`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `input[type=checkbox]`. Additionally, it handles some differently:

Property name | Type      | Default         | Description
--------------|-----------|:---------------:|--------------------------------
className     | string    | n/a             | additional class name passed to wrapper
noLabel       | string    | `"No"`          | label for unchecked switcher
yesLabel      | string    | `"Yes"`         | label for checked switcher
value         | bool      | self-controlled | is it checked?
onChange      | function  | n/a             | event handler for changing value
disabled      | bool      | `false`         | Should it be disabled?
readOnly      | bool      | `false`         | Should it be read-only?

## Changelog

- **0.1.0** - initial version
