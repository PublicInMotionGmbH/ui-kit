# Talixo Calendar

UI Component which represents Calendar

## How to install

Package is available as `@talixo/calendar` in NPM registry, so you can use it in your project
using `npm install @talixo/calendar --save` or `yarn add @talixo/calendar`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `moment: ^2.22.0`
- `react-dates: ^16.5.0`
- `@talixo/shared: ^0.1.0`

These packages are required by `@talixo/calendar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name      | Type                  | Default         | Description
-------------------|-----------------------|:---------------:|--------------------------------
className          | string                | n/a             | additional class name passed to wrapper
displayFormat      | string                | `'D MMM YYYY'`  | date display format
dayAriaLabelFormat | string                | n/a             | day aria label format
monthFormat        | string                | n/a             | month format
phrases            | object                | n/a             | phrases for i18n
weekDayFormat      | string                | n/a             | week day format
placeholder        | string                | n/a             | placeholder text
value              | string or Moment date | self-controlled | current date
onChange           | function              | n/a             | event handler when date is changed
onFocus            | function              | n/a             | event handler when calendar is focused
onBlur             | function              | n/a             | event handler when calendar lost focus

## Changelog

- **0.1.0** - initial version
