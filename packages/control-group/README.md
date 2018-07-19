# Talixo ControlGroup

UI Component which represents ControlGroup

## How to install

Package is available as `@talixo/control-group` in NPM registry, so you can use it in your project
using `npm install @talixo/control-group --save` or `yarn add @talixo/control-group`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.12`
- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/control-group`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type            | Default        | Description   
--------------|-----------------|:--------------:|----------------------------------------
children      | string          | n/a            | Grouped elements
className     | string          | n/a            | Additional class name
orientation   | OrientationType | `'horizontal'` | Orientation of grouped elements
position      | PositionType    | `'left'`       | Position of the group

### Types

Type name       | Enum values
----------------|----------------------------------
OrientationType | `'horizontal'` or `'vertical'`  
PositionType    | `'left'`, `'center'` or `'right'`  

## Changelog

- **0.1.0** - initial version
