# Talixo Notification

UI Component which represents Notification

## How to install

Package is available as `@talixo/notification` in NPM registry, so you can use it in your project
using `npm install @talixo/notification --save` or `yarn add @talixo/notification`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/notification`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description
--------------|-----------|:-------:|------------------------------------------------
className     | string    | n/a     | Additional class name passed to wrapper
children      | node      | n/a     | Notification content
className     | string    | n/a     | Additional class name passed to notification
handleRemove  | func      | n/a     | Function that runs when close button is clicked
style         |           | n/a     | Additional styles passed to notification
variant       | string    | n/a     | Notification variant


## Changelog

- **1.0.0** - initial version
