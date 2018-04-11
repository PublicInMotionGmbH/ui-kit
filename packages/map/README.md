# Talixo map

UI Component which represents map

## How to install

Package is available as `@talixo/map` in NPM registry, so you can use it in your project
using `npm install @talixo/map --save` or `yarn add @talixo/map`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/map`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Maps

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|----------------------------------------
className     | string    | n/a     | additional class name passed to wrapper
apiKey        | string    | n/a     | your Api Key from GoogleMaps
zoom          | number    | `6`     | zoom
markerPosition| object    | n/a     | position of marker
startPoint    | object    | n/a     | start point
endPoint      | object    | n/a     | end point
infoText      | string    | n/a     | text in InfoWindow
interactive   | boolean   | `true`  | enable to move and zoom map

### Directions

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|------------------------------------------------
directions    | object    | n/a     | object with data to render start and end points


## Changelog

- **1.0.0** - initial version
