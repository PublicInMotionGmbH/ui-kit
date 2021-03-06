# Talixo Radio Input

UI Component which represents Radio Input

## How to install

Package is available as `@talixo/radio-input` in NPM registry, so you can use it in your project
using `npm install @talixo/radio-input --save` or `yarn add @talixo/radio-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/radio-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `input[type="radio"]`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
children      | node      | n/a     | radio button description 
className     | string    | n/a     | additional class name passed to wrapper
error         | boolean   | `false` | has this radio input any error?
style         | object    | n/a     | styles passed to wrapper

## Changelog

- **0.1.0** - initial version
