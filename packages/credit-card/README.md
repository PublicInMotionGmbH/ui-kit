# Talixo Credit Card

UI Component which represents Credit Card

## How to install

Package is available as `@talixo/credit-card` in NPM registry, so you can use it in your project
using `npm install @talixo/credit-card --save` or `yarn add @talixo/credit-card`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/credit-card`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### ExpirationDateInput

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
onChange      | function  | n/a     | Handler for onChange event.
value         | string    | n/a     | Value to be displayed inside inputs.

## Changelog

- **0.1.0** - initial version
