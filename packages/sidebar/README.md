# Talixo Sidebar

UI component which represents sidebar for dashboards.

## How to install

Package is available as `@talixo/sidebar` in NPM registry, so you can use it in your project
using `npm install @talixo/sidebar --save` or `yarn add @talixo/sidebar`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/sidebar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Sidebar

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | nodes     | n/a     | Sidebar elements

### SidebarPanel

Property name | Type           | Default | Description
--------------|----------------|:-------:|--------------------------------
className     | string         | n/a     | additional class name passed to wrapper
name          | string or node | n/a     | name to show in panel header
icon          | string         | n/a     | icon name to show next to panel header
children      | nodes          | n/a     | any elements which should be shown in `SidebarPanel` (including `Element`s)

### SidebarElement

Property name | Required | Type           | Default | Description
--------------|----------|----------------|:-------:|--------------------------------
className     | no       | string         | n/a     | additional class name passed to wrapper
label         | yes      | string or node | n/a     | label to show in sidebar or panel
icon          | yes      | string         | n/a     | icon name to show next to label in sidebar or panel
active        | no       | boolean        | false   | is element already active?
children      | no       | nodes          | none    | `Sidebar` or `Panel`, if you want to make it nested and open on click


## Changelog

- **0.1.0** - initial version
