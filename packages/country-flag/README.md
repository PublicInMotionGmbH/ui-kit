# Talixo Country Flag

Light-weight UI component which represents country flags icons.

## How to install

Package is available as `@talixo/country-flag` in NPM registry, so you can use it in your project
using `npm install @talixo/country-flag --save` or `yarn add @talixo/country-flag`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/shared: ^1.0.0-alpha.7`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/country-flag`, but you have to install them manually,
to avoid having different versions of these in your application.

## How to use this component

- You need to use `CountryFlagsProvider` to provide package with country flags
- Sprite is available in `sprites/sprite.svg` directory

### Example

```jsx
import React from 'react'
import { CountryFlag, CountryFlagsProvider } from '@talixo/country-flag'

// Using `file-loader` or `url-loader` in Webpack
const spriteUrl = require('@talixo/country-flag/sprites/sprite.svg')

function App () {
  return (
    <CountryFlagsProvider url={spriteUrl}>
      <div className='app'>
        <header className='header'>
          Language: <CountryFlag code='cz' /> Czech
        </header>
        <div role='main'>
          You can use many different flags, i.e. <CountryFlag code='cz' />, <CountryFlag code='pl' /> or <CountryFlag code='de' />
        </div>
      </div>
    </CountryFlagsProvider>
  )
}
```

## Supported props

### CountryFlag

It allows any property which could be passed to `svg`. Additionally, it handles some differently:

Property name | Type      | Required | Default | Description
--------------|-----------|----------|:-------:|--------------------------------
className     | string    | no       | n/a     | additional class name passed to wrapper
code          | string    | yes      | n/a     | [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code

### CountryFlagsProvider

Property name | Type      | Required | Default | Description
--------------|-----------|----------|:-------:|--------------------------------
url           | string    | no       | n/a     | URL to sprite with country flags

## Available flags

We are using [FlagKit](https://github.com/madebybowtie/FlagKit) flags loaded through [flagkit-web](https://github.com/dfenstermaker/flagkit-web) package.

You can either use one of [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes
or use some of additional: `gb-eng`, `gb-nir`, `gb-sct`, `gb-wls`, `gb-zet`, `lgbt`

## Updating icons

To reinitialize sprites simply run `npm run update` in package - it will automatically generate sprite and component which will include it.
When you will want to use another package with SVG icons, change `paths.source` in `config.js`.

## Changelog

- **0.1.0** - initial version
