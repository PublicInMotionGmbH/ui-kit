# Talixo Card

It's just simple wrapper for Card component.

## How to install

Package is available as `@talixo/card` in NPM registry, so you can use it in your project
using `npm install @talixo/card --save` or `yarn add @talixo/card`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/card`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Card

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | any elements which should be shown in Card (CardHeader, CardContent or CardFooter)

### CardHeader

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | node element to display inside CardHeader
title         | string    | n/a     | title of CardHeader

### CardContent

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | node element to display inside CardContent

### CardFooter

It allows any props which are allowed for 'div'. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
children      | node      | n/a     | node element to display inside CardContent

## Changelog

- **0.1.0** - initial version
