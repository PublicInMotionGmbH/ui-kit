import React from 'react'

import Badge from './src/Badge'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Badge', module)

addStory('badge', readme, () => <Badge>10</Badge>)
