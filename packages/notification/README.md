# Talixo Notification

UI Component which represents Notification

## How to install

Package is available as `@talixo/notification` in NPM registry
so you can use it in your project
using `npm install @talixo/notification --save` or `yarn add @talixo/notification`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-transition-group: ^2.2.1`
- `@talixo/shared: ^0.1.0`
- `@talixo/icon: ^0.1.0`

These packages are required by `@talixo/notification`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Notification

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type    | Default | Description
--------------|---------|:-------:|------------------------------------------------
className     | string  | n/a     | Additional class name passed to wrapper
children      | node    | n/a     | Notification content
className     | string  | n/a     | Additional class name passed to notification
handleRemove  | func    | n/a     | Function that runs when close button is clicked
variant       | Variant | n/a     | Notification variant

Type name | Enum options
----------|--------------------------------------
Variant   | 'left', 'right', 'top', 'bottom'

### NotificationList

It allows any props which are allowed for `div`.

Additionally, it handles some differently:

Property name | Type    | Default | Description
--------------|---------|:-------:|------------------------------------------------
className     | string  | n/a     | Additional class name passed to wrapper

## Changelog

- **0.1.0** - initial version
