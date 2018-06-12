# Talixo Textarea

UI Component which represents Textarea

## How to install

Package is available as `@talixo/textarea` in NPM registry, so you can use it in your project
using `npm install @talixo/textarea --save` or `yarn add @talixo/textarea`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-textarea-autosize: ^6.1.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/textarea`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name    | Type      | Default | Description                    
-----------------|-----------|:-------:|--------------------------------
className        | string    | n/a     | Additional class name passed to wrapper
disabled         | bool      | n/a     | Read-only textarea
maxLength        | number    | n/a     | Define max number of characters in texarea
placeholder      | string    | n/a     | Custom placeholder to show in textarea
resize           | bool      | `true`  | Allow to resize textarea
TextareaComponent| string or node  | `'textarea'`  | Allow to use `'textarea'` tag or TextareaAutosize component

## Changelog

- **0.1.0** - initial version
