# Talixo List

It's just simple wrapper for list.

## How to install

Package is available as `@talixo/list` in NPM registry, so you can use it in your project
using `npm install @talixo/list --save` or `yarn add @talixo/list`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/list`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `ul`. Additionally, it handles some differently:

Property name | Required |Type      | Default | Description
--------------|----------|-----------|:-------:|--------------------------------
className     | no       | string    | n/a     | additional class name passed to wrapper
bullet        | yes      | node      | n/a     | bullet element
children      | no       | node      | n/a     | list of points

## Changelog

- **0.1.0** - initial version
