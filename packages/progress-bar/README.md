# Talixo Progress Bar

UI components for progress bars

## How to install

Package is available as `@talixo/progress-bar` in NPM registry, so you can use it in your project
using `npm install @talixo/progress-bar --save` or `yarn add @talixo/progress-bar`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.7`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/progress-bar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div` (progress bar wrapper). Additionally, it handles some differently:

Property name | Type         | Default | Description
--------------|--------------|:-------:|--------------------------------
className     | string       | n/a     | additional class name passed to wrapper
type          | ProgressType | n/a     | type of progress bar style
size          | ProgressSize | n/a     | size of progress bar
smooth        | boolean      | `true`  | should it smoothly change its width?
striped       | boolean      | `false` | should it have stripes?
value         | number       | n/a     | progress to show (between 0 and 1), otherwise it's indeterminated
children      | node         | n/a     | label to show

Remember, that progress bar without correct `value` will have stripes anyway in indeterminated state.

## Enum types

Name          | Values
--------------|---------------------------------------
ProgressType  | `error`, `success`, `info`, `warning`, `secondary`, `tertiary`
ProgressSize  | `small`

## Changelog

- **0.1.0** - initial version
