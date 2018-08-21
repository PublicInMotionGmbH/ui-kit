# Talixo RadioGroup

UI Component which represents RadioGroup

## How to install

Package is available as `@talixo/radio-group` in NPM registry, so you can use it in your project
using `npm install @talixo/radio-group --save` or `yarn add @talixo/radio-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/radio-input: ^1.0.0-alpha.27`
- `@talixo/shared: ^1.0.0-alpha.27`
- `@talixo/text-input: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/radio-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name     | Type              | Required        | Default         | Description                    
------------------|-------------------|-----------------|:---------------:|--------------------------------
allowCustom       | boolean           | no              | `false`         | Enable custom option.
className         | string            | no              | n/a             | additional class name passed to wrapper
customPlaceholder | string            | no              | n/a             | Placeholder of default custom options input.
name              | string            | no              | n/a             | name of radio group
options           | Option[]          | n/a             | n/a             | array of objects which represent options
error             | boolean           | no              | `false`         | has it any error
value             | any               | no              | self-controlled | value when it's controlled
id                | string            | no              | n/a             | ID passed to control element
disabled          | bool              | no              | `false`         | Should it be disabled?
readOnly          | bool              | no              | `false`         | Should it be read-only?
options           | Option[]          | no              | n/a             | Array of objects which represent options.
vertical          | boolean           | no              | `false`         | Idicates if options should be positioned vertically.
renderCustom      | string            | no              | n/a             | Component which will be displayed as custom option.

## Types

### Option

Option which should be shown in Radio Group has few properties:

Property name | Type              | Required  | Default | Description                    
--------------|-------------------|-----------|:-------:|--------------------------------
disabled      | boolean           | no        | `false` | Idicates if option should be disabled.
label         | string            | yes       | n/a     | Option label.
value         | string            | yes       | n/a     | Value of the option.

## Changelog

- **1.0.0** - initial version
