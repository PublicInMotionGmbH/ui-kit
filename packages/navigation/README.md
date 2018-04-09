# Talixo Navigation

UI Component which represents Navigation

## How to install

Package is available as `@talixo/navigation` in NPM registry, so you can use it in your project
using `npm install @talixo/navigation --save` or `yarn add @talixo/navigation`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/navigation`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Navigation

It allows any props which are allowed for `ul`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
children      | node           | n/a            | Navigation items
className     | string         | n/a            | Additional class name passed to wrapper
divider       | node           | `'/'`          | Divider
type          | NavigationType | `'navigation'` | Type of navigation

### Element

It allows any props which are allowed for `li`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
active        | bool           | `false`        | Active state
children      | node           | n/a            | Element items
className     | string         | n/a            | Additional class name passed to element
disabled      | bool           | `false`        | Disabled state
divider       | node           | `'/'`          | Divider
onClick       | func           | n/a            | Function passed to element
type          | NavigationType | `'navigation'` | Type of navigation

### ControlledPagination

Property name  | Type   | Required | Default  | Description
---------------|--------|----------|:--------:|--------------------------------
activePage     | number |          | `1`      | Active page
displayedLimit | number |          | `10`     | Maximum number of displayed page buttons
nextLabel      | node   |          | `'Next'` | Next button label
onChange       | func   |          | `false`  | Function passed to page buttons
pageCount      | number | yes      | `'/'`    | The total number of pages
previousLabel  | node   |          | n/a      | Previous button label

### ControlledTabs

Property name  | Type   | Required | Default  | Description
---------------|--------|----------|:--------:|--------------------------------
activeTab      | number |          | `0`      | Active tab
labels         | array  |          | `[]`     | List of tab labels
onChange       | func   |          | `false`  | Function passed to page buttons
pageCount      | number | yes      | `'/'`    | The total number of pages
previousLabel  | node   |          | n/a      | Previous button label

#### Types

Type name      | Enum options
---------------|---------------------------------------------------
NavigationType | 'navigation', 'pagination', 'breadcrumbs', 'tabs'

## Changelog

- **1.0.0** - initial version
