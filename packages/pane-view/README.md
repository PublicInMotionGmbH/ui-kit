# Talixo PaneView

UI Component which represents PaneView

## How to install

Package is available as `@talixo/pane-view` in NPM registry, so you can use it in your project
using `npm install @talixo/pane-view --save` or `yarn add @talixo/pane-view`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^1.0.0-alpha.24`

These packages are required by `@talixo/pane-view`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Pane View

It handles all props which can be passed to `div`. Also, handles some differently:

Property name | Type      | Required | Default | Description                    
--------------|-----------|----------|:-------:|--------------------------------
className     | string    |    no    | n/a     | Additional class name passed to wrapper.
children      | node      |    yes   | n/a     | Array of Pane components.
onMouseDown   | function  |    no    | n/a     | Event fired when mouse button is clicked.
split         | string    |    no    | n/a     | One of type `horizontal`, `vertical`.
style         | object    |    no    | n/a     | Additional styles for wrapper.
onResize      | function  |    no    | n/a     | Function fired when Pane is resized
onDragStart   | function  |    no    | n/a     | Function fired when Pane is started to resize
onDragStop    | function  |    no    | n/a     | Function fired when Pane is stopped to resize

### Pane

It handles all props which can be passed to `div`. Also, handles some differently:

Property name | Type    | Required | Default | Description                    
--------------|---------|----------|:-------:|--------------------------------
className     | string  |    no    | n/a     | Additional class name passed to wrapper.
children      | node    |    no    | n/a     | Pane content.
split         | string  |    no    | n/a     | One of type `horizontal`, `vertical`.
style         | object  |    no    | n/a     | Additional styles for wrapper.
size          | number  |    no    | n/a     | Size of Pane.

## Changelog

- **0.1.0** - initial version
