# Talixo Calendar

UI Component which represents Calendar

## How to install

Package is available as `@talixo/calendar` in NPM registry, so you can use it in your project
using `npm install @talixo/calendar --save` or `yarn add @talixo/calendar`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/calendar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
displayFormat | string    | `'D MMM YYYY'` | date display format
lang          | string    | `'en'`  | language of date
placeholder   | string    | n/a     | placeholder text
isRTL         | bool      | `false` | display text from right to left

## Changelog

- **1.0.0** - initial version
