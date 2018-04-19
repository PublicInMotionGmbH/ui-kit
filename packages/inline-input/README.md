# Talixo Inline Input

UI Component which represents Inline Input

## How to install

Package is available as `@talixo/inline-input` in NPM registry, so you can use it in your project
using `npm install @talixo/inline-input --save` or `yarn add @talixo/inline-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/inline-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any properties which are allowed in `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
disabled      | boolean   | `false` | Prevents editing the content.
value         | string    | `''`    | Input value.

## Changelog

- **1.0.0** - initial version
