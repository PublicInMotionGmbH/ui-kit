# Talixo Tooltip

UI Component which represents Tooltip

## How to install

Package is available as `@talixo/tooltip` in NPM registry, so you can use it in your project
using `npm install @talixo/tooltip --save` or `yarn add @talixo/tooltip`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/tooltip`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type         | Default | Description
--------------|--------------|:-------:|-----------------------
children      | nodes        | n/a     | Tooltipped elements
className     | string       | n/a     | Additional class name passed to the tooltip
color         | string       | n/a     | Color of the tooltip
fade          | bool         | `false` | Fade in / out animation
fadeTime      | number       | n/a     | Fadetime
open          | bool         | n/a     | Controls whether tooltip is open
position      | PositionType | `right` | Tooltip position
rootNode      | string       | `body`  | Root element of tooltip portal
render        | func         | n/a     | Renders toolyip content
style         | object       | n/a     | Additional styles passed to the tooltip

Type name    | Enum options
-------------|--------------------------------------
PositionType | 'left', 'right', 'top', 'bottom'

## Changelog

- **1.0.0** - initial version
