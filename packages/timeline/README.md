# Talixo Timeline

UI Component which represents Timeline

## How to install

Package is available as `@talixo/timeline` in NPM registry, so you can use it in your project
using `npm install @talixo/timeline --save` or `yarn add @talixo/timeline`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/timeline`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Timeline
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | chidren inside Timeline

### TimelineLine
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
short         | bool      | n/a     | short version of timeline line
special       | bool      | n/a     | line has special styles

### TimelinePoint
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | chidren inside Timeline
special       | bool      | n/a     | line has special styles

### TimelineElement
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | chidren inside Timeline
time          | string    | n/a     | time to render in component

## Changelog

- **0.1.0** - initial version
