# Talixo DataTable

UI Component which represents DataTable

## How to install

Package is available as `@talixo/data-table` in NPM registry, so you can use it in your project
using `npm install @talixo/data-table --save` or `yarn add @talixo/data-table`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^0.1.1`
- `@talixo/shared: ^0.1.0`
- `@talixo/table: ^0.1.0`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/data-table`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `Table` omponent from `@talixo/table`. Additionally, it handles some differently:

Property name       | Type      | Required  | Default | Description                    
--------------------|-----------|-----------|:-------:|--------------------------------
actions             | Actions[] | no        | n/a     | Actions which can be applied to rows.
className           | string    | no        | n/a     | Additional class name passed to wrapper.
columns             | Column[]  | yes       | n/a     | Information about columns which will be displayed in table.
data                | object[]  | yes       | n/a     | Data to be populated inside table. Require the same keys as inc olumns objects.
expandRender        | function  | no        | n/a     | Render function of items which will be displayed in table collapsible rows.
expandedRows        | array     | no        | n/a     | Array should contain IDs of expanded rows. Its elements should be `id` properties of data items (if provided) or indexes of elements in data array.
onClick             | function  | no        | n/a     | Row onClick callback function.
onSort              | function  | no        | n/a     | onSort function callback.
sortable            | boolean   | no        |`false`  | Indicates if table is sortable.
verticalActionCell  | string    | no        | n/a     | Indicates if actions should be displayed vertically or horizontally.

## Property shapes

### Actions

Property name       | Type      | Required  | Default | Description                    
--------------------|-----------|-----------|:-------:|--------------------------------
condition           | function  | no        | n/a     | Function which indicates if button should be displayed. Assigns item from data as function argument.
icon                | string    | yes       | n/a     | Button icon name from `@talixo/icon` package.
label               | string    | yes       | n/a     | Button label.
onClick             | function  | no        | n/a     | onClick callback function.

### Column

Property name       | Type              | Required  | Default | Description
--------------------|-------------------|-----------|:-------:|--------------------------------
id                  | string or number  | yes       | n/a     | Id of given column.
name                | string            | yes       | n/a     | Name of the column. This will be displayed inside table header.
render              | function          | no        | n/a     | Render function of items to be displayed in table cells of give column.
renderHeader        | function          | no        | n/a     | Render function of given header.

## Changelog

- **0.1.0** - initial version
