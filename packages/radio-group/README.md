# Talixo RadioGroup

UI Component which represents RadioGroup

## How to install

Package is available as `@talixo/radio-group` in NPM registry, so you can use it in your project
using `npm install @talixo/radio-group --save` or `yarn add @talixo/radio-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/radio-input: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/radio-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type     | Default         | Description
--------------|----------|:---------------:|--------------------------------
className     | string   | n/a             | additional class name passed to wrapper
name          | string   | n/a             | name of radio group
options       | Option[] | n/a             | array of objects which represent options
error         | boolean  | `false`         | has it any error
value         | any      | self-controlled | value when it's controlled
id            | string   | n/a             | ID passed to control element
disabled      | bool     | `false`         | Should it be disabled?
readOnly      | bool     | `false`         | Should it be read-only?

## Types

### Option

Option which should be shown in Radio Group has few properties:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
label         | node      | n/a     | Label to show next to radio element
value         | any       | n/a     | Value which it represents
disabled      | boolean   | `false` | Is it disabled?


## Changelog

- **1.0.0** - initial version
