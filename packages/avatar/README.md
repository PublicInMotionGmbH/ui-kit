# Talixo Avatar

UI Component which represents Avatar

## How to install

Package is available as `@talixo/avatar` in NPM registry, so you can use it in your project
using `npm install @talixo/avatar --save` or `yarn add @talixo/avatar`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/avatar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default               | Description                    
--------------|-----------|:---------------------:|--------------------------------
alt           | string    | n/a                   | Alt attribute for the rendered `img` element.
className     | string    | n/a                   | Additional class name.
children      | string    | n/a                   | Text displayed inside avatar.
defaultIcon   | string    | n/a                   | Default icon displayed inside avatar.
defaultText   | string    | n/a                   | Default text displayed inside avatar.
icon          | string    | n/a                   | Icon displayed inside avatar.
imgProps      | object    | n/a                   | Additional props passed to rendered `img` element.
render        | function  | `AvatarChildRenderer` | Format avatar's children.
rounded       | boolean   | `false`               | Controls whether avatar is circular or square.
size          | number    | `40`                  | Size of the avatar in pixels.
src           | string    | n/a                   | Image displayed inside avatar.
srcSet        | string    | n/a                   | Image set displayed inside avatar.
style         | object    | n/a                   | Style passed to wrapper.

## Changelog

- **0.1.0** - initial version
