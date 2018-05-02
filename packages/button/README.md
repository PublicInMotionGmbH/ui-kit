# Talixo Button

It's just simple wrapper for button.

## How to install

Package is available as `@talixo/button` in NPM registry, so you can use it in your project
using `npm install @talixo/button --save` or `yarn add @talixo/button`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/button`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props


It allows any properties which are allowed in `button`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
color         | string    | n/a     | button color
size          | string    | n/a     | button size
variant       | string    | n/a     | button variant

## Changelog

- **0.1.0** - initial version
