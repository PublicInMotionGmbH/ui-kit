# Talixo Dropdown

It's a dropdown built with Downshift component.

## How to install

Package is available as `@talixo/dropdown` in NPM registry, so you can use it in your project
using `npm install @talixo/dropdown --save` or `yarn add @talixo/dropdown`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/dropdown`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name       | Type                  | Default | Description
--------------------|-----------------------|:-------:|--------------------------------
className           | string	              | n/a     |	Additional class name
defaultSelectedItem | node	                | n/a     |	Default selected Item
itemComponent       | func	                | n/a     |	Optional item component
items               | array	                | n/a     |	Items array
maxHeight           | string or number	    | n/a     |	Maximum toggle menu height
menuComponent       | func	                | n/a     |	Toggle menu component
onChange            | func	                | n/a     |	Additional onChange function
overflow            | 'truncate' or 'break' | n/a     |	Item text overflow type
placeholder         | string	              | n/a     |	Placeholder text
style               | object                | n/a     |	Style object
toggleComponent     | func	                | n/a     |	Toggle component

## Changelog

- **1.0.0** - initial version
