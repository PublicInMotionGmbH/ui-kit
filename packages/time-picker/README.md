# Talixo Time Picker

UI Component which represents Time Picker

## How to install

Package is available as `@talixo/time-picker` in NPM registry, so you can use it in your project
using `npm install @talixo/time-picker --save` or `yarn add @talixo/time-picker`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/time-picker`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### TimePicker

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type       | Default | Description
--------------|------------|:-------:|--------------------------------
className     | string     | n/a     | Additional class name passed to wrapper.
onChange      | function   | n/a     | Event called after input value has been changed.
hourFormat    | HourFormat | `'HH'`  | Hour format.
value         | object     | n/a     | Time object passed to component.

### TimeInput

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type        | Required | Default | Description
--------------|-------------|----------|:-------:|--------------------------------
className     | string      |          | n/a     | Additional class name passed to wrapper.
onBlur        | function    |          | n/a     | Event called after input has lost focus.
format        | InputFormat | yes      | n/a     | Format of time.
value         | object      | yes      | n/a     | Time object.

### TimeMenu

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type        | Required | Default | Description
--------------|-------------|----------|:-------:|--------------------------------
className     | string      |          | n/a     | Additional class name passed to wrapper.
columns       | number      |          | n/a     | Number of data columns.
data          | array       | yes      | n/a     | Array of time values.
onValueSelect | function    |          | n/a     | Event handler when menu value is selected.

#### Types

Type name      | Enum options
---------------|---------------------------------------------------
HourFormat     | 'HH', 'hh A'
InputFormat    | 'HH', 'hh A', 'mm'


## Changelog

- **0.1.0** - initial version
