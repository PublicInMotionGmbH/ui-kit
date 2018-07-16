# Talixo Wizard

UI Component which represents Wizard

## How to install

Package is available as `@talixo/wizard` in NPM registry, so you can use it in your project
using `npm install @talixo/wizard --save` or `yarn add @talixo/wizard`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/checkbox: ^1.0.0-alpha.13`
- `@talixo/form: ^1.0.0-alpha.13`
- `@talixo/navigation: ^1.0.0-alpha.12`
- `@talixo/shared: ^1.0.0-alpha.12`
- `@talixo/text-input: ^1.0.0-alpha.12`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/wizard`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default      | Description                    
--------------|-----------|:------------:|--------------------------------
className     | string    | n/a          | Additional class name passed to wrapper.
children      | node      | n/a          | Each children element is separate step of wizard.
displayedLimit| number    | `10`         | Maximum number of displayed steps buttons.
nextLabel     | node      | `'Next'`     | Next button label.
previousLabel | node      | `'Previous'` | Previous button label
step          | number    | n/a          | Custom starting step

## Changelog

- **0.1.0** - initial version
