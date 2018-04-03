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
- `react-dom: ^16.2.0`

These packages are required by `@talixo/navigation`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Navigation

It allows any props which are allowed for `ul`. Additionally, it handles some differently:

Property name | Type       | Default      | Description                    
--------------|------------|:------------:|--------------------------------
children      | node       | n/a          | Navigation items
className     | string     | n/a          | Additional class name passed to wrapper
divider       | node       | '/'          | Divider
type          | navigation | 'navigation' | Type of navigation

### Element

It allows any props which are allowed for `li`. Additionally, it handles some differently:

Property name | Type       | Default      | Description                    
--------------|------------|:------------:|--------------------------------
active        | bool       | false        | Active state
children      | node       | n/a          | Element items
className     | string     | n/a          | Additional class name passed to element
disabled      | bool       | false        | Disabled state
divider       | node       | '/'          | Divider
onClick       | func       | n/a          | Function passed to element
type          | navigation | 'navigation' | Type of navigation

#### Types

navigation    |
--------------|
'navigation'  |
'pagination'  |
'breadcrumbs' |
'tabs'        |

## Changelog

- **1.0.0** - initial version
