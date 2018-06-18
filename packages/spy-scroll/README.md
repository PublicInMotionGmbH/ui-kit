# Talixo Spy Scroll

UI Component which represents Spy Scroll.

## How to install

Package is available as `@talixo/spy-scroll` in NPM registry, so you can use it in your project
using `npm install @talixo/spy-scroll --save` or `yarn add @talixo/spy-scroll`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `lodash.throttle: ^4.1.1`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-instantiable-stateless: ^1.0.3`

These packages are required by `@talixo/spy-scroll`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name       | Type             | Default | Description
--------------------|------------------|:-------:|--------------------------------
children            | node             | n/a     | Spied element.
containerId         | object           | n/a     | Id of spied container.
horizontal          | boolean          | `false` | Switch scroll spy to horizontal.
onVisible           | function         | n/a     | Event triggered when element becomes visible.
onReached           | function         | n/a     | Event triggered when element begins disappearing.
onBeginningAppeared | function         | n/a     | Event triggered when elements appears on the bottom of the viewport.
onBeginningVisible  | function         | n/a     | Event triggered when element is fully visible on the bottom of the viewport.
onEndReached        | function         | n/a     | Event triggered when element reaches top of the viewport.
onEndLost           | function         | n/a     | Event triggered when element disappears on the top of the viewport.
onEndAppeared       | function         | n/a     | Event triggered when elements appears on the top of the viewport.
onEndVisible        | function         | n/a     | Event triggered when element is fully visible on the top of the viewport.
onBeginningReached  | function         | n/a     | Event triggered when element reaches bottom of the viewport.
onBeginningLost     | function         | n/a     | Event triggered when element disappears on the bottom of the viewport.
onTriggerReached    | function         | n/a     | Event triggered when element reaches trigger.
onTriggerRetreats   | function         | n/a     | Event triggered when element retreats over the trigger.
onRangeEntered      | function         | n/a     | Event triggered when element enters range.
onRangeLeft         | function         | n/a     | Event triggered when element leaves range.
offset              | number           | `0`     | Scroll offset for triggers.
range               | array of strings | `[]`    | Array of range elements' id's.
triggerId           | number           | n/a     | Id of the trigger element.


## Changelog

- **0.1.0** - initial version
