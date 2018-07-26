# Talixo Accordion

UI component which represents Accordion

## How to install

Package is available as `@talixo/accordion` in NPM registry, so you can use it in your project
using `npm install @talixo/accordion --save` or `yarn add @talixo/accordion`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/collapse: ^1.0.0-alpha.18`
- `@talixo/shared: ^1.0.0-alpha.18`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/accordion`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name   | Type      | Default               | Description
----------------|-----------|:---------------------:|--------------------------------
className       | string    | n/a                   | additional class name passed to wrapper
smooth          | bool      | n/a                   | should elements be collapsed and opened smoothly?
multi           | bool      | n/a                   | should allow opening many elements at once?
animationTime   | number    | `300`                 | time of smooth animation (in ms)
options         | Option[]  | n/a                   | options to show in Accordion
value           | any       | self-controlled       | ID of currently opened option
onChange        | function  | n/a                   | Handler fired on possible change of opened container
renderOpenIcon  | function  | n/a                   | Render "open" icon for closed option
renderCloseIcon | function  | n/a                   | Render "close" icon for opened option
buildId         | function  | `(x, index) => index` | Function to build unique ID for option

## Types

### Option

Option which should be shown in Accordion has few required properties:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
label         | node      | n/a     | Label to show in button
content       | nodes     | n/a     | Content to put inside collapsible element

## Changelog

- **0.1.0** - initial version
