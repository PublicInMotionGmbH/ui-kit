# Talixo List

It's just simple wrapper for list.

## How to install

Package is available as `@talixo/list` in NPM registry, so you can use it in your project
using `npm install @talixo/list --save` or `yarn add @talixo/list`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/list`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `ul`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
bullet        | node      | n/a     | bullet type 
children      | node      | n/a     | children of list
style         | object    | n/a     | style CSS

## Changelog

- **1.0.0** - initial version