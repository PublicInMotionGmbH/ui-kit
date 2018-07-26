# Talixo CheckboxGroup

UI Component which represents CheckboxGroup

## How to install

Package is available as `@talixo/checkbox-group` in NPM registry, so you can use it in your project
using `npm install @talixo/checkbox-group --save` or `yarn add @talixo/checkbox-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/checkbox: ^1.0.0-alpha.18`
- `@talixo/shared: ^1.0.0-alpha.18`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/checkbox-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type     | Default         | Description
--------------|----------|:---------------:|--------------------------------
className     | string   | n/a             | additional class name passed to wrapper
name          | string   | n/a             | name of checkbox group
options       | Option[] | n/a             | array of objects which represent options
error         | boolean  | `false`         | has it any error
value         | array    | self-controlled | selected values when it's controlled

## Types

### Option

Option which should be shown in Radio Group has few properties:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
label         | node      | n/a     | Label to show next to checkbox element
value         | any       | n/a     | Value which it represents
disabled      | boolean   | `false` | Is it disabled?


## Changelog

- **1.0.0** - initial version
