# Talixo Split View

UI Component which represents Split View

## How to install

Package is available as `@talixo/split-view` in NPM registry, so you can use it in your project
using `npm install @talixo/split-view --save` or `yarn add @talixo/split-view`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/split-view`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name   | Type      | Default | Description
----------------|-----------|:-------:|--------------------------------------------------
className       | string    | n/a     | Additional class name.
data            | object[]  | n/a     | Data to be displayed inside SplitView component.
detailsRender   | function  | n/a     | Render function of details section.
itemRender      | function  | n/a     | Render function of list section.
listHeader      | node      | n/a     | Header element of list section.
onSelect        | function  | n/a     | onSelect callback.
openItem        | number    | n/a     | Opened element.

## Changelog

- **0.1.0** - initial version
