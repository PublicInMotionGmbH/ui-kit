# Talixo Popover

It's just simple wrapper for popover.

## How to install

Package is available as `@talixo/popover` in NPM registry, so you can use it in your project
using `npm install @talixo/popover --save` or `yarn add @talixo/popover`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/popover`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Popover

Property name | Type         | Default | Description
--------------|--------------|:-------:|--------------------------------
attachTo      | node         | n/a     | root node of popover
className     | string       | n/a     | additional class name passed to wrapper
children      | node         | n/a     | children node in popover
color         | string       | n/a     | color of text in popover
fade          | bool         | n/a     | popover is fading
fadeTime      | number       | n/a     | time of fading
open          | bool         | n/a     | popover is visible
layer         | number       | n/a     | quantity of popover layer
position      | PositionType | n/a     | position of popover

### Portal

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
attachTo      | node      | n/a     | root node of portal
children      | node      | n/a     | children node in portal
tagName       | string    | n/a     | type of parent element


Type name    | Enum options
-------------|--------------------------------------
PositionType | 'left', 'right', 'top', 'bottom'

## Changelog

- **1.0.0** - initial version
