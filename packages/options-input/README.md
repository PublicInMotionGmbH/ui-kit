# Talixo OptionsInput

UI Component which represents OptionsInput

## How to install

Package is available as `@talixo/options-input` in NPM registry, so you can use it in your project
using `npm install @talixo/options-input --save` or `yarn add @talixo/options-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.5`
- `@talixo/number-input: ^1.0.0-alpha.5`
- `@talixo/shared: ^1.0.0-alpha.5`
- `@talixo/tooltip: ^1.0.0-alpha.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/options-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### OptionsInput

It allows any property which can be passed to `div`. Additionally, it handles some differently:

Property name     | Type      | Default         | Description
------------------|-----------|:---------------:|--------------------------------
className         | string    | n/a             | Additional class name passed to wrapper
options           | Option[]  | `[]`            | Array with objects containing data passed to component
persistentOptions | string[]  | `[]`            | Array of options IDs which will be displayed event if their value is 0.
value             | object    | self-controlled | Value of option/options
onChange          | function  | n/a             | Event handler fired on value change
onFocus           | function  | n/a             | Event handler fired on input open
onBlur            | function  | n/a             | Event handler fired on input blur

## Property shapes

### Option

Property name | Type      | Required | Default | Description                    
--------------|-----------|----------|:-------:|--------------------------------
id            | string    | yes      | n/a     | Id for option
icon          | string    | no       | n/a     | Type of icon
label         | string    | no       | n/a     | Label for option
default       | number    | no       | n/a     | Default value
min           | number    | no       | n/a     | Minimum value within the range
max           | number    | no       | n/a     | Maxnimum value within the range



## Changelog

- **0.1.0** - initial version
