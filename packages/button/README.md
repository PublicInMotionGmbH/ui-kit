# Talixo Button

It's just simple wrapper for button.

## How to install

Package is available as `@talixo/button` in NPM registry, so you can use it in your project
using `npm install @talixo/button --save` or `yarn add @talixo/button`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/button`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | all button below
color         | string    | n/a     | button color
disabled      | boolean   | n/a     | enabled or disabled button
id            | string    | n/a     | button id
onClick       | function  | n/a     | action on click event
size          | string    | n/a     | button size
style         | object    | n/a     | button style
variant       | string    | n/a     | button variant

## Changelog

- **1.0.0** - initial version