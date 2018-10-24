# Talixo Navigation

UI Component which represents Navigation

## How to install

Package is available as `@talixo/navigation` in NPM registry, so you can use it in your project
using `npm install @talixo/navigation --save` or `yarn add @talixo/navigation`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/button: ^1.0.0-alpha.31`
- `@talixo/icon: ^1.0.0-alpha.31`
- `@talixo/number-input: ^1.0.0-alpha.31`
- `@talixo/shared: ^1.0.0-alpha.31`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/navigation`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Navigation

It allows any props which are allowed for `nav`. Additionally, it handles some differently:

Property name | Type            | Default        | Description
--------------|-----------------|:--------------:|--------------------------------
children      | node            | n/a            | Navigation items. Visible only when elements are not passed.
className     | string          | n/a            | Additional class name passed to wrapper.
elements      | ElementShape[]  | `[]`           | Divider
panel         | boolean         | n/a            | Should it be a panel? Applies only to Navigation type `sidebar`.
subtitle      | node            | n/a            | Submenu title.
type          | NavigationType  | `'navbar'`     | Type of navigation.

### Element

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
active        | boolean        | n/a            | Is element active?
children      | node           | n/a            | Element children.
className     | string         | n/a            | Additional class name passedto element wrapper.
completed     | boolean        | n/a            | Is action related to this element completed (e.g. iniside a step)?
disabled      | boolean        | n/a            | Is element disabled?
error         | boolean        | n/a            | Does it have ana error? 
id            | number|string  | n/a            | Element identifier. It will be passed to onChange and onHover functions as a first argument.
label         | node           | n/a            | Element label.
onClick       | function       | n/a            | onClick callback.
open          | boolean        | n/a            | Is this element open? 
render        | function       | DefaultRender  | Render method of each element.
subelements   | ElementShape[] | n/a            | Array of subelements. Any of element prop can be passed to each object.
subtitle      | node           | n/a            | Subtitle of element exapandable menu.
type          | node           | n/a            | Navigation type.

### Pagination

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name       | Type      | Default     | Description
--------------------|-----------|:-----------:|--------------------------------
activePage          | number    | n/a         | Active page.
className           | string    | n/a         | Additional class name passed to wrapper.
displayedLimit      | number    | `1`         | Maximum number of displayed page buttons on each side of active page.
ellipsisPlaceholder | node      | `...`       | Placeholder for the ellipsis.
hidePages           | boolean   | n/a         | Allows to hide page from pagination.
hideButtons         | boolean   | n/a         | Allows to hide pagination buttons (`Next` and `Previous`).
nextDisabled        | boolean   | n/a         | Should `Next` button be disabled.
nextLabel           | node      | `Next`      | Next button label.
onChange            | function  | n/a         | Function passed to page buttons.
pageCount           | number    | n/a         | The total number of pages.
previousDisabled    | boolean   | n/a         | Should `Previous` button be disabled?
previousLabel       | node      | `Previous`  | Previous button label.


## Types

Type name      | Enum options
---------------|---------------------------------------------------------------------------
NavigationType | 'breadcrumbs', 'navbar', 'pagination', 'sidebar', 'steps', 'tabs', 'tree'


## Property shapes

### ElementShape

Property name | Type           | Default        | Description
--------------|----------------|:--------------:|--------------------------------
active        | boolean        | n/a            | Is element active?
children      | node           | n/a            | Element children.
className     | string         | n/a            | Additional class name passedto element wrapper.
completed     | boolean        | n/a            | Is action related to this element completed (e.g. iniside a step)?
disabled      | boolean        | n/a            | Is element disabled?
error         | boolean        | n/a            | Does it have ana error? 
id            | number|string  | n/a            | Element identifier. It will be passed to onChange and onHover functions as a first argument.
label         | node           | n/a            | Element label.
onClick       | function       | n/a            | onClick callback.
open          | boolean        | n/a            | Is this element open? 
render        | function       | DefaultRender  | Render method of each element.
subelements   | ElementShape[] | n/a            | Array of subelements. Any of element prop can be passed to each object.
subtitle      | node           | n/a            | Subtitle of element exapandable menu.
type          | node           | n/a            | Navigation type.


## Functions

### DefaultRender
```jsx harmony
function defaultRender (props, options) {
  return props.type !== 'tree'
    ? props.label
    : <span>
      <Icon
        style={{ visibility: props.subelements ? 'visible' : 'hidden' }}
        name={options.open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
      />
      { props.label }
    </span>
}
```

## Changelog

- **0.1.0** - initial version
