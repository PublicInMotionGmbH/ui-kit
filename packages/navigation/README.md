# Talixo Navigation

UI Component which represents Navigation

## How to install

Package is available as `@talixo/navigation` in NPM registry, so you can use it in your project
using `npm install @talixo/navigation --save` or `yarn add @talixo/navigation`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.18`
- `@talixo/tooltip: ^1.0.0-alpha.18`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/navigation`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Navigation

It allows any props which are allowed for `ul`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
children      | node           | n/a            | Navigation items
className     | string         | n/a            | Additional class name passed to wrapper
divider       | node           | n/a            | Divider
type          | NavigationType | `'navigation'` | Type of navigation

### Element

It allows any props which are allowed for `li`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
active        | bool           | `false`        | Active state
children      | node           | n/a            | Element items
className     | string         | n/a            | Additional class name passed to element
completed     | bool           | `false`        | Completed state
disabled      | bool           | `false`        | Disabled state
onClick       | func           | n/a            | Function passed to element

### Step

It allows any props which are allowed for `li`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
active        | bool           | `false`        | Active state
children      | node           | n/a            | Tooltips content
className     | string         | n/a            | Additional class name passed to element
completed     | bool           | `false`        | Completed state
disabled      | bool           | `false`        | Disabled state
onClick       | func           | n/a            | Function passed to element

### ControlledPagination

Property name  | Type   | Required | Default      | Description
---------------|--------|----------|:------------:|--------------------------------
activePage     | number |          | `1`          | Active page
displayedLimit | number |          | `10`         | Maximum number of displayed page buttons
nextLabel      | node   |          | `'Next'`     | Next button label
onChange       | func   |          | n/a          | Function passed to page buttons
pageCount      | number | yes      | n/a          | The total number of pages
previousLabel  | node   |          | `'Previous'` | Previous button label

### ControlledTabs

Property name  | Type    | Required | Default  | Description
---------------|---------|----------|:--------:|--------------------------------
activeTab      | number  |          | `0`      | Active tab
labels         | Label[] |          | `[]`     | List of tab labels
onChange       | func    |          | n/a      | Function passed to page buttons

### Steps

Property name  | Type   | Required | Default  | Description
---------------|--------|----------|:--------:|--------------------------------
current        | object |          | n/a      | Active step
steps          | Step[] |          | `[]`     | List of steps
onChange       | func   |          | n/a      | Function passed to step buttons

#### Types

Type name      | Enum options
---------------|---------------------------------------------------
NavigationType | 'navigation', 'pagination', 'breadcrumbs', 'tabs'

### Property shapes

#### Label

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
id            | number    | yes      | n/a           | Label's id
name          | string    | yes      | n/a           | Label's name

#### Step

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
name          | string    | yes      | n/a           | Step's name
disabled      | boolean   | yes      | n/a           | Disabled state

## Changelog

- **0.1.0** - initial version
