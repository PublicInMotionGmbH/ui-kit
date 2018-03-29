# Talixo UI Kit

It's UI Kit used through all Talixo front-end projects. You can see storybook [here](https://publicinmotiongmbh.github.io/ui-kit).

## Getting started

### Setting up environment

- This project requires `Node 4+` and `yarn` or `npm` installed
- Clone this repository to your computer
- Run `npm run init` or `yarn run init:yarn`
- Everything is ready to go!

### NPM Scripts available

You can run scripts using `npm run NAME` or `yarn run NAME` commands.

- `init` / `init:yarn` - install required packages and bootstrap all subpackages.
- `storybook` - run Storybook in development mode (available at `http://localhost:9009/`)
- `build-storybook` - build static Storybook into `storybook-static` directory

### Working with Lerna

[Lerna](https://github.com/lerna/lerna) is a tool for managing monorepos.
You can install it globally for easier use. There are few most important commands:

- `lerna bootstrap` - Install dependencies of subpackages, link cross-dependencies
- `lerna run` - Run NPM command in all subpackages
- `lerna add some-package` - Add `some-package` to all subpackages in repository
- `lerna updated` - Check if any of subpackages has been updated
- `lerna publish` - Publish changes to NPM registry

### Running tests

There are two test runners available:

#### Jest

You can either run `npm test` or `yarn test` in each directory,
or you can use `lerna run test` to run them in all packages.

Additionally, it's worth to note that using Lerna you can run your tests in parallel as well: `lerna run --parallel test`

##### Watchers

When you would like to run it in watching mode, just pass `--watch` parameter, i.e. `npm test -- --watch`.
Remember, that you can do it only in single package. If you would like to watch in every package same time, you can use WallabyJS.

#### WallabyJS

There is also configuration setup for [Wallaby](http://wallabyjs.com/) test runner,
and it just works out of the box.

### Code style

We are using [ESLint](https://eslint.org/) with [StandardJS](https://standardjs.com/) rules.
It is validated on `pre-commit` hook as well.

### Hooks

There is set up [Husky](https://github.com/typicode/husky) for Git hooks.

- Before push: **tests are passing**
- Before commit: **code style is correct**

### Packages

Each package is available in `packages` directory. Typical structure:

```
├── .npmignore
├── README.md                        <-- Documentation
├── dist                             <-- Generated files
│   └── index.js
├── index.js                         <-- Main file
├── package-lock.json
├── package.json
├── rollup.config.js                 <-- Simple build configuration
├── src                              <-- Module code
│   └── Switcher.js
├── stories.js                       <-- Stories which should be used in Storybook
├── styles                           <-- Sass styles
│   ├── config.sass                  <-- Styles configuration for components 
│   ├── geometry.sass                <-- Geometry (basic behavior) styles
│   ├── theming.sass                 <-- Theming (make it beautiful and matching Talixo) styles
│   └── main.sass                    <-- Used in storybook, includes both geometry and theming
└── tests                            <-- Directory for Jest tests
    ├── Switcher.test.js
    └── __snapshots__                <-- Automatically generated snapshots
        └── Switcher.test.js.snap
```

#### Creating new package

There is straight-forward wizard available after `npm run create` command.

### Writing stories for storybook

Stories are automatically loaded into storybook from `stories.js` file directly in package directory.
The same thing is with stylesheets, Storybook is automatically loading `styles/main.sass` file.

#### Creating story

You can use standard storybook options or use our helpers for that.

##### Simple story

```js
import React from 'react'

import Something from './src/Something'

import { createStoriesFactory } from '@talixo/shared/story'

const addStory = createStoriesFactory('Something', module)

addStory('initial', 'some description', () => <Something />)
addStory('disabled', 'some description', () => <Something disabled />)
```

##### Controlled story

If you need to show component which needs to keep state somewhere,
Storybook info addon by default will show source only of Controller.
Because of that, there is additional helper which will show source code correctly:

```js
import React from 'react'

import FancyButton from './src/FancyButton'

import { createStoriesFactory } from '@talixo/shared/story'

const addStory = createStoriesFactory('FancyButton', module)

function render (setState, state) {
  return (
    <div style={{ fontSize: state.size }}>
      Text
      <FancyButton onClick={() => setState({ size: state.size + 1 })}>Increase</FancyButton>
    </div>
  )
}

function getInitialState () {
  return {
    size: 10
  }
}

addStory.controlled('initial', 'some description', render, getInitialState)
```

### Development commands & troubleshooting

Description                                                  | Example
-------------------------------------------------------------|------------------------------------------------------------
Install all required packages through whole monorepo         | `npm run init`
Install development dependency for all packages or storybook | `npm install babel --save-dev`
Install dependencies of all subpackages                      | `lerna bootstrap --hoist`
Resolve cross-dependencies between our packages              | `lerna bootstrap --hoist` or `lerna link`
Install dependency inside single package                     | `lerna add jquery --scope @talixo/switcher`
Run all tests                                                | `npm test` in main directory
Create new package                                           | `npm run create` in main directory
Publish all changed packages to NPM                          | `lerna publish`
Publish single package                                       | `lerna publish --scope @talixo/switcher`
Lint whole code                                              | `npm run lint`
Starting Storybook for development at port `9009`            | `npm run storybook`
Starting Storybook for development at different port         | `npm run storybook -- -p 5555`
Build static code for Storybook into `storybook-static`      | `npm run build-storybook`
Remove all `node_modules`                                    | `find . -name "node_modules" -exec rm -rf '{}' +` in main directory
Reinitializing everything                                    | `find . -name "node_modules" -exec rm -rf '{}' + && npm run init` in main directory
