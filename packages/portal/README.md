# Talixo Portal

UI component which wraps Portals

## How to install

Package is available as `@talixo/portal` in NPM registry, so you can use it in your project
using `npm install @talixo/portal --save` or `yarn add @talixo/portal`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.12`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/portal`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default           | Description
--------------|-----------|:-----------------:|--------------------------------
className     | string    | n/a               | additional class name passed to wrapper
attachTo      | Element   | `document.body`   | DOM Element where Portal should be attached

## Changelog

- **0.1.0** - initial version
