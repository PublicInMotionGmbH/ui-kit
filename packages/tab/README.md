# Talixo Tab

UI Component which represents Tab

## How to install

Package is available as `@talixo/tab` in NPM registry, so you can use it in your project
using `npm install @talixo/tab --save` or `yarn add @talixo/tab`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/tab`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
active        |	bool      |	"false"	| Active state
children      |	node      | n/a     | Tab content
className     |	string    | n/a     | Additional class name

## Changelog

- **1.0.0** - initial version
