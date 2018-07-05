# Talixo Form Handler

UI Component which represents Form Handler

## How to install

Package is available as `@talixo/form-handler` in NPM registry, so you can use it in your project
using `npm install @talixo/form-handler --save` or `yarn add @talixo/form-handler`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/form-field: ^1.0.0-alpha.5`
- `@talixo/shared: ^1.0.0-alpha.5`
- `formik: ^0.11.11`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/form-handler`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `Formik` and `form`. Additionally, it handles some differently:

Property name      | Type      | Default | Description                    
-------------------|-----------|:-------:|-------------------------------------------------------------------------
className          | string    | n/a     | Additional class name passed to wrapper.
errors             | object    | n/a     | Error object. Key is a name of a field.
onSubmit           | function  | n/a     | onSubmit callback function.
validationSchema   | object    | n/a     | Validation object. A Yup schema or a function that returns a Yup schema.
values             | object    | n/a     | Initial values of form fields.
formatErrorMessage | function  | n/a     | Default formatter for error messages in `FormField`s inside.
FormComponent      | component | `form`  | Component used as Form wrapper.

## Changelog

- **0.1.0** - initial version
