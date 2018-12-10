# Talixo Form

UI Components which represents form elements, helpers and form itself.

## How to install

Package is available as `@talixo/form` in NPM registry, so you can use it in your project
using `npm install @talixo/form --save` or `yarn add @talixo/form`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.35`
- `formik: ^0.11.11`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `yup: ^0.26.6`

These packages are required by `@talixo/form`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Form

Property name   | Type      | Default | Description                    
----------------|-----------|:-------:|--------------------------------
children        | node      | n/a     | Children to be put inside form.
className       | string    | n/a     | Additional class name passed to wrapper.
footerComponent | node      | n/a     | Component to be displayed in footer.
horizontal      | bool      | n/a     | Default `horizontal` property passed to `Field`s inside
spread          | bool      | n/a     | Default `spread` property passed to `Field`s inside

### FormHandler

It allows any props which are allowed for `Formik` and any props available in `FormComponent` (by default `Form`). Additionally, it handles some differently:

Property name      | Type      | Default | Description                    
-------------------|-----------|:-------:|-------------------------------------------------------------------------
className          | string    | n/a     | Additional class name passed to wrapper.
errors             | object    | n/a     | Error object. Key is a name of a field.
onSubmit           | function  | n/a     | onSubmit callback function.
validationSchema   | object    | n/a     | Validation object. A Yup schema or a function that returns a Yup schema.
values             | object    | n/a     | Initial values of form fields.
formatErrorMessage | function  | n/a     | Default formatter for error messages in `FormField`s inside.
FormComponent      | component | `Form`  | Component used as Form wrapper.
disabled           | bool      | `false` | Should disable all fields in form?
readOnly           | bool      | `false` | Should set all fields in form as read-only?

### Field

Property name      | Type      | Default  | Description
-------------------|-----------|:--------:|--------------------------------
className          | string    | n/a      | Additional class name passed to wrapper.
error              | node      | n/a      | Displayed error message.
hint               | node      | n/a      | Displayed hint message.
id                 | string    | n/a      | Id for input.
label              | node      | n/a      | Label for input.
onBlur             | function  | n/a      | Event called after input has lost focus.
onChange           | function  | n/a      | Event called after input has been changed.
onFocus            | function  | n/a      | Event called after input has gained focus.
warning            | node      | n/a      | Displayed warning message.
value              | any       | n/a      | Value passed to input.
horizontal         | bool      | `false`  | Should it have horizontal layout?
spread             | bool      | `false`  | Only for `horizontal`; should it expand input width, when there is no hint?
formatErrorMessage | function  | `x => x` | Formatter for error & warning messages.
disabled           | bool      | `false`  | Should force this field to be disabled?
readOnly           | bool      | `false`  | Should force this field as read-only?

### FormFooter

Property name      | Type      | Default  | Description
-------------------|-----------|:--------:|--------------------------------
className          | string    | n/a      | Additional class name passed to footer.
children           | node      | n/a      | Elements to put inside footer.

### Fieldset

It allows any props which are allowed for `fieldset`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|------------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
children      | node      | n/a     | Children node in fieldset like input or checkbox

### Legend

It allows any props which are allowed for `legend`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|------------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
children      | node      | n/a     | Legend content, i.e. title
aside         | node      | n/a     | Aside legend, i.e. additional info

### FormRow

It's (virtually used in many places) wrapper for form elements composition.
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|------------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
children      | node      | n/a     | Basic content to put inside.
start         | node      | n/a     | Content to put on left (top) side, i.e. label
end           | node      | n/a     | Content to put on right (bottom) side, i.e. hint
horizontal    | bool      | `false` | Should it have horizontal layout?
spread        | bool      | `false` | Only for `horizontal`; should it expand input width, when there is no hint?

## Changelog

- **1.0.0** - initial version
