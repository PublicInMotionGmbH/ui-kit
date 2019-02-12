# Talixo Rating

UI component which represents rating.

## How to install

Package is available as `@talixo/rating` in NPM registry, so you can use it in your project
using `npm install @talixo/rating --save` or `yarn add @talixo/rating`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/rating`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name   | Type      | Default  | Description
----------------|-----------|:--------:|--------------------------------
className       | string    | n/a      | Additional class name passed to wrapper.
hidePlaceholder | boolean   | n/a      | Should icon placeholders be displayed?
icon            | string    | `'star'` | Icon name to use inside (from `@talixo/icon`).
keyboard        | bool      | `true`   | Should handle keyboard events for change?
onChange        | function  | n/a      | Handler for changing rating by user.
size            | number    | `5`      | Number of visible icons.
value           | number    | `0`      | Rating to show, between 0 and 1.

## Changelog

- **0.1.0** - initial version
