# Talixo Countdown

UI Component which represents Countdown

## How to install

Package is available as `@talixo/countdown` in NPM registry, so you can use it in your project
using `npm install @talixo/countdown --save` or `yarn add @talixo/countdown`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/countdown`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type    | Required  | Default              | Description                    
--------------|---------|-----------|:--------------------:|--------------------------------
className     | string  |   no      |         n/a          | Additional class name passed to wrapper
format        | string  |   no      | `'dd : hh : mm : ss'`| Format of displayed date
targetDate    | string  |   yes     |         n/a          | The date to which it will count down  

## Changelog

- **0.1.0** - initial version
