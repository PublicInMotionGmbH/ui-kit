# Talixo File Input

UI Component which represents File Input

## How to install

Package is available as `@talixo/file-input` in NPM registry, so you can use it in your project
using `npm install @talixo/file-input --save` or `yarn add @talixo/file-input`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/button: ^1.0.0-alpha.31`
- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/file-input`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default         | Description                    
--------------|-----------|:---------------:|--------------------------------
buttonLabel   | string    | 'Browse Files'  | Label of browse file button.
children      | nodes     | n/a             | Content displayed in drop box.
className     | string    | n/a             | Additional class name.
dropDisabled  | boolean   | `false`         | Disable drag and drop.
files         | string    | n/a             | Dropped files.
renderFile   | function  | `File`          | File component renderer.
multiple      | boolean   | `true`          | Allows multiple files uploading.
uploadLabel   | node      | n/a             | Label displayed alongside button.
onChange      | function  | n/a             | onChange callback. Invoked when either files have been dropped or file input has changed.
onRemove      | function  | n/a             | File onRemove callback.
onDragEnd     | function  | n/a             | onDragEnd callback. Applies sent files and event.
onDragEnter   | function  | n/a             | onDragEnter callback. Applies sent files and event.
onDragExit    | function  | n/a             | onDragExit callback. Applies sent files and event.
onDragLeave   | function  | n/a             | onDragLeave callback. Applies sent files and event.
onDragOver    | function  | n/a             | onDragOver callback. Applies sent files and event.
onDragStart   | function  | n/a             | onDragEnd callback. Applies sent files and event.

## Changelog

- **0.1.0** - initial version
