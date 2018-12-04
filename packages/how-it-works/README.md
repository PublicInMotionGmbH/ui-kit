# Talixo - How It Works

UI Component which represents "how it works" element, to show step by step what will happen.

## How to install

Package is available as `@talixo/how-it-works` in NPM registry, so you can use it in your project
using `npm install @talixo/how-it-works --save` or `yarn add @talixo/how-it-works`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.31`
- `prop-types: ^15.6.1`
- `react: ^16.6.3`
- `react-dom: ^16.6.3`

These packages are required by `@talixo/how-it-works`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
steps         | Step[]    | `[]`    | An array of steps containing the explanation of how it works.

## Property shapes

### Step

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
description   | string    | n/a     | Description of a step.
image         | Element   | n/a     | Image element which will be displayed above step.
title         | string    | n/a     | Title of a step.

## Changelog

- **0.1.0** - initial version
