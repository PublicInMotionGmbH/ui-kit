# Talixo Device Swap

UI Component which represents Device Swap

## How to install

Package is available as `@talixo/mobile-swap` in NPM registry, so you can use it in your project
using `npm install @talixo/mobile-swap --save` or `yarn add @talixo/mobile-swap`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/mobile-swap`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

There are 3 properties used directly by this component, all other are passed to renderers.

Property name | Type      | Default     | Description                    
--------------|-----------|:-----------:|--------------------------------
defaultView   | string    | `"desktop"` | `"desktop"` or `"mobile"` - view used until device type is determined
renderMobile  | function  | n/a         | renderer for mobile view
renderDesktop | function  | n/a         | renderer for desktop view

## Changelog

- **0.1.0** - initial version
