# Talixo Grid

UI components which represents grid. The base one is `Segment` - in traditional grid systems it's just a column.
There are also `Group` and `Masonry` components, which are also `Segment`s, so can be stacked.

- `Segment` is a block (or column traditionally)
- `Group` is a group of segments (or a row traditionally)
- `Masonry` is group of groups

We are using grid with 12 columns for now.

## How to install

Package is available as `@talixo/grid` in NPM registry, so you can use it in your project
using `npm install @talixo/grid --save` or `yarn add @talixo/grid`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^0.1.0`
- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/grid`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Segment

Property name | Type        | Default       | Description
--------------|-------------|:-------------:|--------------------------------
className     | string      | n/a           | additional class name
size          | number      | n/a, full row | default number of columns (from small screen)
medium        | number      | n/a           | number of columns from medium screen
large         | number      | n/a           | number of columns from large screen
xlarge        | number      | n/a           | number of columns from extra-large screen

### Group

Property name | Type        | Default       | Description
--------------|-------------|:-------------:|--------------------------------
className     | string      | n/a           | additional class name
spaced        | boolean     | false         | Should keep spaces between?
children      | Segment[]   | n/a           | Segment elements (includes also Group and Masonry)
size          | number      | n/a, full row | look at Segment
medium        | number      | n/a           | look at Segment
large         | number      | n/a           | look at Segment
xlarge        | number      | n/a           | look at Segment

### Masonry

Property name | Type        | Default       | Description
--------------|-------------|:-------------:|--------------------------------
className     | string      | n/a           | additional class name
children      | Group[]     | n/a           | Group elements
size          | number      | n/a, full row | look at Segment
medium        | number      | n/a           | look at Segment
large         | number      | n/a           | look at Segment
xlarge        | number      | n/a           | look at Segment

## Changelog

- **0.1.0** - initial version
