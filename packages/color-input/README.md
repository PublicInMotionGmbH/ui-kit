# Talixo ColorInput

UI Component which represents ColorInput

## How to install

Package is available as `@talixo/color-input` in NPM registry, so you can use it in your project
using `npm install @talixo/color-input --save` or `yarn add @talixo/color-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: 1.0.0-alpha.12`
- `@talixo/text-input: 1.0.0-alpha.12`
- `@talixo/slider: 1.0.0-alpha.12`
- `@talixo/tooltip: 1.0.0-alpha.12`

These packages are required by `@talixo/color-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any properties which are allowed in `div`. Additionally, it handles some differently:

Property name | Type      | Default     | Description                    
--------------|-----------|:-----------:|--------------------------------
className     | string    | n/a         | Additional class name passed to wrapper
alpha         | boolean   | n/a         | Show alpha channel
defaultColor  | string    | n/a         | Set default color to be shown at the beginning
hsl           | boolean   | n/a         | Show HSL manipulation tool
palette       | Palette[] | n/a         | Palette of predefined colors

### Palette

Palette which should be shown in ColorInput component has few required properties:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
id            | string    | n/a     | Unique id of color
name          | string    | n/a     | Name of color
color         | string    | n/a     | Color in hex, rgb or rgba format

## Changelog

- **0.1.0** - initial version
