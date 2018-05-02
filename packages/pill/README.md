# Talixo Pill

It's just simple wrapper for Pill.

## How to install

Package is available as `@talixo/pill` in NPM registry, so you can use it in your project
using `npm install @talixo/pill --save` or `yarn add @talixo/pill`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/pill`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any property which can be passed to `span`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
color         | string    | n/a     | pill color
variant       | string    | n/a     | pill variant (ghost)

## Changelog

- **0.1.0** - initial version
