# Talixo Collapse

UI component for collapsible containers

## How to install

Package is available as `@talixo/collapse` in NPM registry, so you can use it in your project
using `npm install @talixo/collapse --save` or `yarn add @talixo/collapse`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/collapse`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name  | Type      | Default | Description                    
---------------|-----------|:-------:|--------------------------------
className      | string    | n/a     | Additional class name passed to wrapper.
style          | object    | n/a     | Additional styles passed to wrapper.
collapsed      | bool      | n/a     | Should it be collapsed?
smooth         | bool      | n/a     | Should it collapse and open smoothly?
animationSpeed | number    | n/a     | Animation speed (in px/ms).
children       | node      | n/a     | Content of collapsible container.

## Changelog

- **0.1.1** - optimize behavior when content is changing dynamically
- **0.1.0** - initial version
