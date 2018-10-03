# Talixo map

UI Component which represents map

## How to install

Package is available as `@talixo/map` in NPM registry, so you can use it in your project
using `npm install @talixo/map --save` or `yarn add @talixo/map`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.30`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-google-maps: 9.4.5`
- `recompose: 0.26.0`

These packages are required by `@talixo/map`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Map

You've got few ways to authorize your Google Maps API:

- Load Google Maps JS SDK by yourself
- Pass `apiKey` or `clientId` to this component
- Pass `allowDevelopmentApi` property, to load Google Maps JS SDK without credentials

Property name       | Type      | Required | Default | Description
--------------------|-----------|----------|:-------:|----------------------------------------
className           | string    | no       | n/a     | additional class name passed to wrapper
apiKey              | string    | no       | n/a     | Your API Key from Google Maps
clientId            | string    | no       | n/a     | Your Client ID from Google Maps
allowDevelopmentApi | string    | no       | `false` | Should load missing Google Maps API SDK without credentials?
zoom                | number    | no       | `6`     | zoom
center              | Location  | no       | n/a     | centered position
interactive         | boolean   | no       | `true`  | enable to move and zoom map
options             | object    | no       | n/a     | MapOptions passed to Map object

### Directions

Property name | Type                | Required | Default | Description
--------------|---------------------|----------|:-------:|------------------------------------------------
startPoint    | Location            | yes      | n/a     | start point of directions
endPoint      | Location            | yes      | n/a     | end point of directions
via           | Location|Location[] | no       | n/a     | either single waypoint or list of waypoints
onLoad        | function            | no       | n/a     | handler after successfully loaded directions
onError       | function            | no       | n/a     | handler after error while loading new directions

### Marker

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
position      | Location  | yes      | n/a           | start point of directions
info          | nodes     | no       | n/a           | info window content
open          | boolean   | no       | is controlled | should the info window be opened?
onClick       | function  | no       | n/a           | handler on click on marker
onClose       | function  | no       | n/a           | handler on click on close button in info window

## Property shapes

### Location

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
lat           | number    | yes      | n/a           | geo-point latitude
lng           | number    | yes      | n/a           | geo-point longitude

## Changelog

- **0.1.0** - initial version
