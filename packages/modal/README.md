# Talixo Modal

UI Kit modal component. It can be used as a wrapper that shows provided content above the rest of a page

## How to install

Package is available as `@talixo/modal` in NPM registry, so you can use it in your project
using `npm install @talixo/modal --save` or `yarn add @talixo/modal`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/portal: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/modal`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

### Modal

Property name   | Type      | Default | Description                    
----------------|-----------|:-------:|--------------------------------
className       | string    | n/a     | Additional class name passed to wrapper.
children        | nodes     | n/a     | Content of modal, including header and footer.
onEscKeyDown    | function  | n/a     | Handles pressing escape key.
onOverlayClick  | function  | n/a     | Controls whether modal is open.
open            | bool      | `true`  | Controls whether modal is open.
informational   | bool      | `false` | It's simple, informational modal.
icon            | node      | n/a     | Icon to show in informational modal
type            | string    | n/a     | Type of informational modal for styling: `success`, `info`, `warning` or `error`.
attachTo        | Element   | `body`  | HTML element where open modal should be attached to.

### ModalHeader

It allows any props which are allowed for `header`. Additionally, it handles some differently:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.

### ModalFooter

It allows any props which are allowed for `footer`. Additionally, it handles some differently:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.

## Changelog

- **0.1.0** - initial version
