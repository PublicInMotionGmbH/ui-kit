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
- `@talixo/icon: ^0.1.1`

These packages are required by `@talixo/carousel`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Carousel

It handles all props which can be passed to `div`. Also, handles some differently:

Property name   | Type      | Default         | Description
----------------|-----------|:---------------:|--------------------------------
arrows          | bool      | n/a             | Arrows to navigate between slides
children        | nodes     | n/a             | Elements in each slides
className       | string    | n/a             | Additional class name passed to wrapper
dots            | bool      | n/a             | Dots to navigate between slides
animationTime   | number    | `500`           | Duration of animation (in ms)
perPage         | number    | `1`             | Number of visible slides
renderDots      | function  | `Dots`          | Function which render custom dots
value           | number    | self-controlled | Index of currently selected slide element
onChange        | function  | n/a             | Event handler for change of slide
defaultMovement | string    | `"exact"`       | Default behavior of movement (for controlled component), when neither dots nor arrows were clicked, one of: `exact`, `forward`, `back`

### CarouselAutoplay

Property name   | Type      | Default                      | Description
----------------|-----------|:----------------------------:|--------------------------------
interval        | number    | `3000`                       | Time in milliseconds to go to next slide
movement        | string    | `"forward"`                  | Movement behavior, one of: `exact`, `forward`, `back`
children        | node      | n/a                          | Carousel element, which should have auto-play behavior
initialSlide    | number    | get from carousel' `value`   | Slide where it should start on
step            | number    | get from carousel' `perPage` | Numbers of slides to move each interval

## Changelog

- **0.1.0** - initial version
