# Talixo Text Input

UI Component which represents Text Input

## How to install

Package is available as `@talixo/text-input` in NPM registry, so you can use it in your project
using `npm install @talixo/text-input --save` or `yarn add @talixo/text-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/text-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props
It allows any props which are allowed for `input[type=text]`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
hasError      | boolean   | `false` | indicates that input has error
onChange      | function  | `() => {}`  | callback for change event
placeholder   | string    | n/a     | Input floating label text 
size          | string    | `''`    | size of text input (can be 'small')
style         | object    | n/a     | additional input wrapper styling

## Changelog

- **1.0.0** - initial version