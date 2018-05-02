# Talixo Tooltip

UI Component which represents Tooltip

## How to install

Package is available as `@talixo/tooltip` in NPM registry, so you can use it in your project
using `npm install @talixo/tooltip --save` or `yarn add @talixo/tooltip`.

## Requirements

Your package should additionally have some extra dependencies:

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
fade          | bool         | `false` | Fade in / out animation
fadeTime      | number       | n/a     | Fadetime
open          | bool         | n/a     | Controls whether tooltip is open
position      | Position     | `right` | Tooltip position
attachTo      | node         | n/a     | node of tooltip portal
render        | function     | n/a     | Renders tooltip content
style         | object       | n/a     | Additional styles passed to the tooltip
arrow         | bool         | `true`  | Show arrow next to tooltip
triggerOn     | Trigger      | `hover` | Type of event to open tooltip

Type name    | Enum options
-------------|--------------------------------------
Position     | 'left', 'right', 'top', 'bottom'
Trriger      | 'hover', 'click'

## Changelog

- **0.1.0** - initial version
