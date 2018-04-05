# Talixo ComboBox

It's a combo-box built with Downshift component.

## How to install

Package is available as `@talixo/combo-box` in NPM registry, so you can use it in your project
using `npm install @talixo/combo-box --save` or `yarn add @talixo/combo-box`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/combo-box`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### ComboBox

It handles all `div` properties, and additionally:

Property name       | Type                  | Default | Description
--------------------|-----------------------|:-------:|--------------------------------
defaultSelectedItem | node                  | n/a     | Default selected Item
itemComponent       | func                  | n/a     | Optional item component
items               | array                 | n/a     | Items array
maxHeight           | string or number      | n/a     | Maximum toggle menu height
menuComponent       | func                  | n/a     | Toggle menu component
onChange            | func                  | n/a     | Additional onChange function
overflow            | 'truncate' or 'break' | n/a     | Item text overflow type
placeholder         | string                | n/a     | Placeholder text
separated           | bool                  | n/a     | Displays toggle and menu components as separated elements
toggleComponent     | func                  | n/a     | Toggle component

### Dropdown

It handles all `div` properties, and additionally:

Property name       | Type                  | Default | Description
--------------------|-----------------------|:-------:|--------------------------------
defaultSelectedItem | node                  | n/a     | Default selected Item
itemComponent       | func                  | n/a     | Optional item component
items               | array                 | n/a     | Items array
maxHeight           | string or number      | n/a     | Maximum toggle menu height
onChange            | func                  | n/a     | Additional onChange function
overflow            | 'truncate' or 'break' | n/a     | Item text overflow type
placeholder         | string                | n/a     | Placeholder text
separated           | bool                  | n/a     | Displays button and menu components as separated elements

### Autocomplete

It handles all `div` properties, and additionally:

Property name       | Type                  | Default | Description
--------------------|-----------------------|:-------:|--------------------------------
defaultSelectedItem | node                  | n/a     | Default selected Item
items               | array                 | n/a     | Items array
loading             | bool                  | n/a     | Loading state
inputComponent      | func                  | n/a     | Input component
maxHeight           | string or number      | n/a     | Maximum toggle menu height
onChange            | func                  | n/a     | Additional onChange function
overflow            | 'truncate' or 'break' | n/a     | Item text overflow type
placeholder         | string                | n/a     | Placeholder text
separated           | bool                  | n/a     | Displays input and menu components as separated elements

## Changelog

- **1.0.0** - initial version
