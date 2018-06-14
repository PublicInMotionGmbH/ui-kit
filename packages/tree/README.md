# Talixo Tree

UI Component which represents Tree

## How to install

Package is available as `@talixo/tree` in NPM registry, so you can use it in your project
using `npm install @talixo/tree --save` or `yarn add @talixo/tree`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`
- `@talixo/icon: ^0.1.1`
- `@talixo/collapse: ^0.1.1`

These packages are required by `@talixo/tree`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Tree

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper
data          | DataType[]| n/a     | Data passed to component
initialOpen   | bool      | `false` | Open tree on load
onClick       | func      | n/a     | Function passed to trigger when click on node
selectEnabled | bool      | `false` | Enable to select each node
smooth        | bool      | `true`  | Animation of collapse

## Property shapes

## DataType

Type name       | Type              |
----------------|----------------------------------
id              |  number           | id of node
name            |  string           | name od node
children        |  dataType[]       | children of node

## Changelog

- **0.1.0** - initial version
