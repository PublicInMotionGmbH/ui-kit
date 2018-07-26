# Talixo Badge

Simple badge component

## How to install

Package is available as `@talixo/badge` in NPM registry, so you can use it in your project
using `npm install @talixo/badge --save` or `yarn add @talixo/badge`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.18`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/badge`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `span`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | node element to display inside badge
pill          | bool      | `false` | should this badge be a pill?
onRemove      | function  | n/a     | handler for clicking on "remove" button (which will be shown when handler is used)
removeText    | node      | `×`     | content of "remove" button

## Changelog

- **0.1.0** - initial version
