# Talixo Notification

UI Component which represents Notification

## How to install

Package is available as `@talixo/notification` in NPM registry
so you can use it in your project
using `npm install @talixo/notification --save` or `yarn add @talixo/notification`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-transition-group: ^2.2.1`

These packages are required by `@talixo/notification`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Notification

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type             | Default | Description
--------------|------------------|:-------:|------------------------------------------------
className     | string           | n/a     | Additional class name passed to wrapper
children      | node             | n/a     | Notification content
className     | string           | n/a     | Additional class name passed to notification
onClose       | function         | n/a     | Function that runs when close button is clicked
type          | NotificationType | n/a     | Notification variant

### NotificationList

It allows any props which are allowed for `div`.

Additionally, it handles some differently:

Property name | Type               | Default  | Description
--------------|--------------------|:--------:|------------------------------------------------
className     | string             | n/a      | Additional class name passed to wrapper
items         | NotificationItem[] | n/a      | list of notifications to show
autoClose     | bool               | `false`  | should it manage closing notifications by itself?
sticky        | bool               | `false`  | should it be sticked to screen?
horizontal    | HorizontalPosition | `start`  | horizontal position of sticked list (RTL aware)
vertical      | VerticalPosition   | `bottom` | vertical position of sticked list

## Types

### Enums

Enum name          | Enum options
-------------------|--------------------------------------
NotificationType   | 'toast', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info'
HorizontalPosition | `start`, `center`, `end`
VerticalPosition   | `top`, `bottom`

### NotificationItem

Item which should be shown in `NotificationList` accept all `Notification` properties, except `children` (renamed to `content`):

Property name | Type             | Default | Description
--------------|------------------|:-------:|--------------------------------
className     | string           | n/a     | Additional class name passed to wrapper
content       | node             | n/a     | Notification content
className     | string           | n/a     | Additional class name passed to notification
onClose       | function         | n/a     | Function that runs when close button is clicked
type          | NotificationType | n/a     | Notification variant

## Changelog

- **0.1.0** - initial version
