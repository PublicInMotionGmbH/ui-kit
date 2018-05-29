# Talixo Fieldset

UI Component which represents Fieldset

## How to install

Package is available as `@talixo/fieldset` in NPM registry, so you can use it in your project
using `npm install @talixo/fieldset --save` or `yarn add @talixo/fieldset`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/fieldset`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `fieldset`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|------------------------------------
asideLegend   | node      | n/a     | Aside legend of fieldset
className     | string    | n/a     | Additional class name passed to wrapper.
children      | node      | n/a     | Children node in fieldset like input or checkbox
legend        | string    | n/a     | Legend of fieldset

## Changelog

- **1.0.0** - initial version
