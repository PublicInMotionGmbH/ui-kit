# Talixo Progress ring

UI Component which represents progress ring

## How to install

Package is available as `@talixo/progress-ring` in NPM registry, so you can use it in your project
using `npm install @talixo/progress-ring --save` or `yarn add @talixo/progress-ring`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/progress-ring`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which could be passed to `span`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
value         | number    | `NaN`   | progress (between 0 and 1), when it's not set it's indeterminate
type          | string    | n/a     | type of progress, may be `success`, `warning`, `info` or `error`
children      | node      | n/a     | content put inside a circle

## Changelog

- **0.1.0** - initial version
