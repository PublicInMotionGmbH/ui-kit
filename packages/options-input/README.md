# Talixo OptionsInput

UI Component which represents OptionsInput

## How to install

Package is available as `@talixo/options-input` in NPM registry, so you can use it in your project
using `npm install @talixo/options-input --save` or `yarn add @talixo/options-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`,
- `@talixo/number-input: ^0.1.0`,
- `@talixo/tooltip: ^0.1.0`,
- `@talixo/icon: ^0.1.0`

These packages are required by `@talixo/options-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### OptionsInput

It allows any property which can be passed to `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper
options       | array     | `[]`    | Array with objects containing data passed to component

### ListOption

It allows any property which can be passed to `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
option        | object    | n/a     | Object with data passed to component
value         | number    | n/a     | Value of input
onChange      | func      | n/a     | Function passed to element

### Option

It allows any property which can be passed to `span`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
option        | object    | n/a     | Object with data passed to component
value         | number    | n/a     | Value of input

## Changelog

- **0.1.0** - initial version
