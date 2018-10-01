# Talixo Combo box

UI Component which represents Combo box

## How to install

Package is available as `@talixo/combo-box` in NPM registry, so you can use it in your project
using `npm install @talixo/combo-box --save` or `yarn add @talixo/combo-box`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/device-swap: ^1.0.0-alpha.28`
- `@talixo/icon: ^1.0.0-alpha.27`
- `@talixo/shared: ^1.0.0-alpha.27`
- `downshift: ^2.1.1`
- `prop-types: ^15.6.1`
- `react: ^16.4.2`
- `react-dom: ^16.4.2`
- `react-input-autosize: ^2.2.1`

These packages are required by `@talixo/combo-box`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

All of these components additionally allow some of `Downshift` props.

### SelectBox

Property name  | Type      | Default           | Description
---------------|-----------|:-----------------:|--------------------------------
className      | string    | n/a               | Additional class name passed to wrapper
options        | array     | n/a               | Options to show
placeholder    | node      | n/a               | Placeholder to show when there is no value
multi          | bool      | `false`           | Is it multi-select?
value          | any       | self-controlled   | Value to show inside
icon           | node      | n/a               | Icon shown next to select box
onChange       | function  | n/a               | Handler for onChange event
onBlur         | function  | n/a               | Handler for onBlur event
onFocus        | function  | n/a               | Handler for onFocus event
renderItem     | function  | `item => item`    | Function to render item in menu list
renderValue    | function  | uses `renderItem` | Function to render value in select box
buildItemId    | function  | item index        | Function to build unique ID of item
itemToString   | function  | `item => item`    | Function to convert item to string
id             | string    | n/a               | ID passed to control element
mobileFriendly | bool      | n/a               | Should it act more like native "select" button on mobile devices?
disabled       | bool      | `false`           | Should it be disabled?
readOnly       | bool      | `false`           | Should it be read-only?

### ComboBox

Property name      | Type      | Default           | Description
-------------------|-----------|:-----------------:|--------------------------------
className          | string    | n/a               | Additional class name passed to wrapper
options            | array     | n/a               | Options to show
placeholder        | string    | n/a               | Placeholder to show when there is no value
multi              | bool      | `false`           | Is it multi-select?
value              | any       | self-controlled   | Value to show inside
inputValue         | string    | self-controlled   | Value to show in input
icon               | node      | n/a               | Icon shown next to select box
onChange           | function  | n/a               | Handler for onChange event
onInputValueChange | function  | n/a               | Handler fired when input value has changed
onNewValue         | function  | n/a               | Function fired when new value is requested in multi combo-box
onBlur             | function  | n/a               | Handler for onBlur event
onFocus            | function  | n/a               | Handler for onFocus event
renderItem         | function  | `item => item`    | Function to render item in menu list
renderValue        | function  | uses `renderItem` | Function to render value (or tag) in select box
buildItemId        | function  | item index        | Function to build unique ID of item
itemToString       | function  | `item => item`    | Function to convert item to string
id                 | string    | n/a               | ID passed to control element
tabIndex           | number    | n/a               | Tab index passed to toggle button
disabled           | bool      | `false`           | Should it be disabled?
readOnly           | bool      | `false`           | Should it be read-only?

### AutoComplete

Property name      | Type      | Default           | Description
-------------------|-----------|:-----------------:|--------------------------------
className          | string    | n/a               | Additional class name passed to wrapper
footer             | node      | n/a               | Footer for items list
options            | array     | n/a               | Options to show
children           | node      | n/a               | Input to show
onChoose           | function  | n/a               | Handler fired when option is selected
onBlur             | function  | n/a               | onBlur event passed from input
onFocus            | function  | n/a               | onFocus event passed from input
onChange           | function  | n/a               | onChange event passed from input
renderItem         | function  | `item => item`    | Function to render item in menu list
buildItemId        | function  | item index        | Function to build unique ID of item
itemToString       | function  | `item => item`    | Function to convert item to string
id                 | string    | n/a               | ID passed to control element
openOnFocus        | bool      | `false`           | Should open auto-complete on focus already?
disabled           | bool      | `false`           | Should it be disabled?
readOnly           | bool      | `false`           | Should it be read-only?

## Changelog

- **0.1.0** - initial version
