# Talixo Image Input

UI Component which represents Image Input

## How to install

Package is available as `@talixo/image-input` in NPM registry, so you can use it in your project
using `npm install @talixo/image-input --save` or `yarn add @talixo/image-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/button: ^1.0.0-alpha.27`
- `@talixo/icon: ^1.0.0-alpha.27`
- `@talixo/shared: ^1.0.0-alpha.27`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/image-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type                        | Default | Description                    
--------------|-----------------------------|:-------:|------------------------------------------------
className     | string                      | n/a     | Additional class name passed to wrapper
label         | string                      | n/a     | Upload button label.
onChange      | function                    | n/a     | Function which handles image change. Receives URL data, ArrayBuffer, or File object.
onDragEnd     | function                    | n/a     | onDragEnd callback.
onDragEnter   | function                    | n/a     | onDragEnter callback.
onDragExit    | function                    | n/a     | onDragExit callback.
onDragLeave   | function                    | n/a     | onDragLeave callback.
onDragOver    | function                    | n/a     | onDragOver callback.
onDragStart   | function                    | n/a     | onDragStart callback.
onRemove      | function                    | n/a     | onRemove callback.
type          | string                      | `url`   | Type of data passed to onChange function: `url`, `binary`, `file`.
value         | string, ArrayBuffer or File | n/a     | Image which can be controlled from outside component.

## Changelog

- **0.1.0** - initial version
