# Talixo DataTable

UI Component which represents DataTable

## How to install

Package is available as `@talixo/data-table` in NPM registry, so you can use it in your project
using `npm install @talixo/data-table --save` or `yarn add @talixo/data-table`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `@talixo/table: ^1.0.0-alpha.31`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/data-table`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `Table` omponent from `@talixo/table`. Additionally, it handles some differently:

Property name       | Type      | Required  | Default           | Description                    
--------------------|-----------|-----------|:-----------------:|--------------------------------
actions             | Actions[] | no        | n/a               | Actions which can be applied to rows.
buildId             | function  | no        | `(row, idx) => row.id` | Function which will be used to add ID to object items if these are not already inside them.
className           | string    | no        | n/a               | Additional class name passed to wrapper.
columns             | Column[]  | yes       | n/a               | Information about columns which will be displayed in table.
data                | object[]  | yes       | n/a               | Data to be populated inside table. Require the same keys as inc olumns objects.
expandRender        | function  | no        | n/a               | Render function of items which will be displayed in table collapsible rows.
expandedRows        | array     | no        | n/a               | Array should contain IDs of expanded rows. Its elements should be `id` properties of data items (if provided) or indexes of elements in data array.
onClick             | function  | no        | n/a               | Row onClick callback function.
onSort              | function  | no        | n/a               | onSort function callback.
sortable            | boolean   | no        | `false`           | Indicates if table is sortable.
sortColumn          | string    | no        | self-controlled   | ID of the column according to which data is sorted.
reversedOrder       | boolean   | no        | self-controlled   | Indicates if table is sortable.
verticalActionCell  | string    | no        | n/a               | Indicates if actions should be displayed vertically or horizontally.
children            | nodes     | no        | n/a               | Other nodes put after data-table body.
footer              | node      | no        | n/a               | Full-width footer on end of table.

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
