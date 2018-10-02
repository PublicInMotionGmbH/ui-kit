# Talixo Table

UI components which are used to create tables in simple and good way.

## How to install

Package is available as `@talixo/table` in NPM registry, so you can use it in your project
using `npm install @talixo/table --save` or `yarn add @talixo/table`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.30`
- `@talixo/shared: ^1.0.0-alpha.30`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/table`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Table

Represents table itself.

It handles all `table` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to table
children      | nodes     | n/a     | `Head`, `Body` and `Footer` elements to put inside
condensed     | boolean   | false   | Should table be condensed (more content, less spacing)?
fixed         | boolean   | false   | Should table have fixed layout?

### Head

Represents table header (`<thead>` with single row).

It handles all `thead` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | `HeadCell`s to put inside

### HeadCell

Represents single cell inside table `Head`.

It handles all `th` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | Content to put inside

### Body

Represents single row inside table `Body`.

It handles all `tbody` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | `Rows`s to include inside table content

### Row

Represents single row inside table `Body`.

It handles all `tr` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | `Cell`s to include inside table row

### Cell

Represents single cell inside table `Row` or `Footer`.

It handles all `td` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | Elements to include inside cell

### ActionsCell

Represents cell which can contain `Action`s inside.

It handles all `td` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to cell
children      | nodes     | n/a     | `Action`s which should be included in table
vertical      | boolean   | false   | Should Actions inside be shown vertically?

### Action

Represents Action button in `ActionsCell`.

It handles all `button` properties, and additionally:

Property name | Type           | Default | Description
--------------|----------------|:-------:|--------------------------------
className     | string         | n/a     | additional class name passed to button
icon          | string         | n/a     | icon name to represent action
label         | string or node | n/a     | label to represent action
warn          | boolean        | false   | should be handled carefully? - changed color and maybe confirmation before.

### Footer

Represents table footer (`<tfoot>` with single row).

It handles all `tfoot` properties, and additionally:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
children      | nodes     | n/a     | cells which should be included in table footer row

## Simple example

```js
```

## Changelog

- **0.1.0** - initial version
