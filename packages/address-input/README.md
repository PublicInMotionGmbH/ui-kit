# Talixo AddressInput

UI Component which represents AddressInput

## How to install

Package is available as `@talixo/address-input` in NPM registry, so you can use it in your project
using `npm install @talixo/address-input --save` or `yarn add @talixo/address-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/address: ^1.0.0-alpha.36`
- `@talixo/button: ^1.0.0-alpha.35`
- `@talixo/combo-box: ^1.0.0-alpha.35`
- `@talixo/device-swap: ^1.0.0-alpha.35`
- `@talixo/icon: ^1.0.0-alpha.35`
- `@talixo/masked-input: ^1.0.0-alpha.35`
- `@talixo/progress-ring: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `@talixo/text-input: ^1.0.0-alpha.35`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-transition-group: ^2.2.1`

These packages are required by `@talixo/address-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Address Input

Property name  | Type        | Default                           | Description                    
---------------|-------------|:---------------------------------:|--------------------------------
className      | string      | n/a                               | Address of location.
footer         | node        | n/a                               | AutoComplete list footer.
label          | string      | n/a                               | Mobile view input label.
loading        | boolean     | n/a                               | Indicates if loader should be displayed inside input.
locations      | Location[]  | n/a                               | Locations to be displayed inside AutoComlete.
onBlur         | function    | n/a                               | onBlur callback.
onChange       | function    | n/a                               | onChange callback.
onFocus        | function    | n/a                               | onFocus callback.
onLoadRequest  | function    | n/a                               | This function is called when changes input value, at has typed in at least 3 letters. It can be used to load locations from external API.
onStopRequest  | function    | n/a                               | This function is called when changes input value, at has typed less than 3 letters.
placeholder    | string      | n/a                               | AddressInput placeholder.
minLetters     | number      | `3`                               | Minimum number of letters to request load/stop procedure.
writingDelay   | number      | `300`                             | Debounce delay (in milliseconds) for writing, to not request `load` procedure.
mobileFriendly | boolean     | `true`                            | Should it try to show it better way on mobile?
renderAddress  | function    | (props) => <Address {...props} /> | Address component which will be displayed inside autocomplete list.
value          | Location    | n/a                               | Chosen location value.

### Property shapes

### Location

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
address       | string    | n/a     | Basic address information.
details       | string    | n/a     | Additional information about place.
type          | string    | n/a     | Address type to determine icon displayed next to the address.
meta          | Meta      | n/a     | Metadata of location.
short         | string    | n/a     | Place name abbreviation. It can be e.g. IATA code of an airport.

### Meta

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
description   | string    | n/a     | Description of a place. If provided it will be displayed inside AddressInput.


## Changelog

- **0.1.0** - initial version
