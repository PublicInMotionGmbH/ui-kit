# Talixo Address

UI component which represents address and path of waypoints

## How to install

Package is available as `@talixo/address` in NPM registry, so you can use it in your project
using `npm install @talixo/address --save` or `yarn add @talixo/address`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/address`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Address

Property name     | Type        | Default   | Description                    
------------------|-------------|:---------:|--------------------------------
address           | string      | n/a       | Address of a place.
className         | string      | n/a       | Additional class name passed to wrapper.
details           | string      | n/a       | Place details.
formatDetails     | function    | `x => x`  | Format details.
type              | string      | n/a       | Address type to determine icon displayed next to the address.
short             | string      | n/a       | Place name abbreviation. It can be e.g. IATA code of an airport.

### AddressPath

Property name | Type        | Required  | Default | Description                    
--------------|-------------|-----------|:-------:|--------------------------------
children      | nodes       | true      | n/a     | E.x. steps of a journey. Works best with Address component.
className     | string      | false     | n/a     | AutoComplete list footer.

### AddressIconsProvider

Property name | Type        | Required  | Default                                        | Description                    
--------------|-------------|-----------|:----------------------------------------------:|--------------------------------
children      | nodes       | true      | n/a                                            | Elements to render which will get this new map of icons through context.
types         | object      | false     | map with most popular Google Maps type covered | Map `address type => icon name`

## Changelog

- **0.1.0** - initial version
