# Talixo RadioGroup

UI Component which represents RadioGroup

## How to install

Package is available as `@talixo/radio-group` in NPM registry, so you can use it in your project
using `npm install @talixo/radio-group --save` or `yarn add @talixo/radio-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/radio-input: ^0.1.0`
- `@talixo/shared: ^0.1.0`
- `@talixo/text-input: ^0.2.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/radio-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name     | Type              | Required  | Default | Description                    
------------------|-------------------|-----------|:-------:|--------------------------------
allowCustom       | boolean           | no        | n/a     | Enable custom option.
className         | string            | no        | n/a     | Additional class name passed to wrapper.
customComponent   | string            | no        | n/a     | Component which will be displayed as custom option.
customPlaceholder | string            | no        | n/a     | Placeholder of default custom options input.
name              | string            | yes       | n/a     | Name of radio group.
options           | Option[]          | no        | n/a     | Array of objects which represent options.
size              | string            | no        | n/a     | Checkbox label size ('small' or 'large').
value             | number or string  | no        | n/a     | Value of default option.
vertical          | boolean           | no        | n/a     | Idicates if options should be positioned vertically.

## Property shapes

Property name | Type              | Required  | Default | Description                    
--------------|-------------------|-----------|:-------:|--------------------------------
disabled      | boolean           | no        | n/a     | Idicates if option should be disabled.
label         | string            | yes       | n/a     | Option label.
value         | string            | yes       | n/a     | Value of the option.

## Changelog

- **1.0.0** - initial version
