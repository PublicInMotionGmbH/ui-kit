# Talixo Icon

It's package which contains React component to handle icons easily.

We are using Material UI icons and additionally some custom icons.

## How to install

Package is available as `@talixo/icon` in NPM registry, so you can use it in your project
using `npm install @talixo/icon --save` or `yarn add @talixo/icon`.

## How to add or update new icons

- Add icon to `@talixo/icon-pack`
- Change `@talixo/icon-pack` version in `package.json` to newer
- Run `npm run load` (or `yarn run load`) command

## How to use without React

You should look at `@talixo/icon-pack` package instead.

## Requirements for React component

Your package should additionally have some extra dependencies:

- `@talixo/icon-pack: 1.2.2`
- `@talixo/shared: ^1.0.0-alpha.30`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/icon`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `span`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to icon
name          | string    | n/a     | icon name

## Changelog

- **0.1.1** - add new icons
- **0.1.0** - initial version
