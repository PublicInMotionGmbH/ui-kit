# Talixo RadioGroup

UI Component which represents RadioGroup

## How to install

Package is available as `@talixo/radio-group` in NPM registry, so you can use it in your project
using `npm install @talixo/radio-group --save` or `yarn add @talixo/radio-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/radio-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
name          | string    | n/a     | name of radio group
options       | array     | n/a     | array of objects which represent options
size          | string    | n/a     | checkbox label size ('small' or 'large')
value         | number or string | n/a   | value of default option

## Changelog

- **1.0.0** - initial version
