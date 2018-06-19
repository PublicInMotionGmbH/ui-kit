# Talixo Carousel

UI Component which represents Carousel

## How to install

Package is available as `@talixo/carousel` in NPM registry, so you can use it in your project
using `npm install @talixo/carousel --save` or `yarn add @talixo/carousel`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/carousel`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
arrows        | bool      | n/a     | Arrows to navigate between slides
children      | node      | `[]`    | Elements in each slides
className     | string    | n/a     | Additional class name passed to wrapper
dots          | bool      | n/a     | Dots to navigate between slides
duration      | number    | `500`   | Duration of animation in ms
perPage       | number    | `1`     | Number of visible slides
renderDots    | func      | `Dots`  | Function which render custom dots

## Changelog

- **0.1.0** - initial version
