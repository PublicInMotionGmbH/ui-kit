# Talixo Form

UI Component which represents Form

## How to install

Package is available as `@talixo/form` in NPM registry, so you can use it in your project
using `npm install @talixo/form --save` or `yarn add @talixo/form`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/form`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name   | Type      | Default | Description                    
----------------|-----------|:-------:|--------------------------------
children        | node      | n/a     | Children to be put inside form.
className       | string    | n/a     | Additional class name passed to wrapper.
footerComponent | node      | n/a     | Component to be displayed in footer.

## Changelog

- **1.0.0** - initial version
