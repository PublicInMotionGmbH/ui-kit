# Talixo Inline Input

UI Component which represents Inline Input

## How to install

Package is available as `@talixo/inline-input` in NPM registry, so you can use it in your project
using `npm install @talixo/inline-input --save` or `yarn add @talixo/inline-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.35`
- `@talixo/text-input: ^1.0.0-alpha.35`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/inline-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any properties which are allowed in `div`. Additionally, it handles some differently:

Property name   | Required | Type      | Default | Description
----------------|----------|-----------|:-------:|--------------------------------
className       | no       | string    | n/a     | Additional class name passed to wrapper.
disabled        | no       | boolean   | `false` | Prevents editing the content.
readOnly        | no       | boolean   | `false` | Should text field be read-only?
emptyValue      | no       | string    | n/a     | Rendered value for empty input value.
error           | no       | boolean   | `false` | Indicates that input has error.
icon            | no       | node      | n/a     | Right side input icon or controls.
onInputChange   | no       | function  | n/a     | Callback for change event.
placeholder     | yes      | string    | n/a     | Input placeholder.
value           | no       | string    | `''`    | Input value.
id              | no       | string    | n/a     | ID passed to control element.
disabled        | no       | bool      | `false` | Should it be disabled?
readOnly        | no       | bool      | `false` | Should it be read-only?

## Changelog

- **1.0.0** - initial version
