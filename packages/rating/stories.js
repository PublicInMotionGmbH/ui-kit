import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import Rating from './src/Rating'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Rating', module, {
  propTables: [ Rating ]
})

// Stories

addStory('basic', readme, () => (
  <div>
    <Rating value={0.1} /><br />
    <Rating value={0.2} /><br />
    <Rating value={0.3} /><br />
    <Rating value={0.4} /><br />
    <Rating value={0.5} /><br />
    <Rating value={0.6} /><br />
    <Rating value={0.7} /><br />
    <Rating value={0.8} /><br />
    <Rating value={0.9} /><br />
    <Rating value={1} /><br />
    <Rating value={100} /><br />
    <Rating value={1} />
  </div>
))

addStory('without placeholders', readme, () => (
  <div>
    <Rating value={0.15} hidePlaceholder /><br />
    <Rating value={0.25} hidePlaceholder /><br />
    <Rating value={0.35} hidePlaceholder /><br />
    <Rating value={0.45} hidePlaceholder /><br />
    <Rating value={0.55} hidePlaceholder /><br />
    <Rating value={0.6} hidePlaceholder /><br />
    <Rating value={0.7} hidePlaceholder /><br />
    <Rating value={0.8} hidePlaceholder /><br />
    <Rating value={0.9} hidePlaceholder /><br />
    <Rating value={1} hidePlaceholder /><br />
    <Rating value={1000} hidePlaceholder /><br />
    <Rating value={2} size={0} hidePlaceholder />
  </div>
))

addStory('selectable', readme, () => (
  <Rating value={0.5} onChange={action('change rating')} />
))

addStory('controlled from keyboard', readme, () => (
  <div>
    <button type='button' onClick={() => setTimeout(() => document.querySelector('[class*=-rating--selectable]').focus())}>
      Focus
    </button>

    <p>Click "focus" and control by arrow keys on your keyboard.</p>

    <Rating value={0.5} onChange={action('change rating')} />
  </div>
))

addStory('different number of icons', readme, () => (
  <div>
    <Rating value={0.4} size={1} /><br />
    <Rating value={0.4} size={2} /><br />
    <Rating value={0.4} size={3} /><br />
    <Rating value={0.4} size={4} /><br />
    <Rating value={0.4} size={5} /><br />
    <Rating value={0.4} size={6} /><br />
    <Rating value={0.4} size={7} /><br />
    <Rating value={0.4} size={8} /><br />
    <Rating value={0.4} size={9} /><br />
    <Rating value={0.4} size={10} /><br />
    <Rating value={0.4} size={20} />
  </div>
))

addStory('different icons', readme, () => (
  <div>
    <Rating value={0.7} /><br />
    <Rating value={0.7} icon='grade' /><br />
    <Rating value={0.7} icon='star_border' /><br />
    <Rating value={0.7} icon='stars' /><br />
    <Rating value={0.7} icon='circle' /><br />
    <Rating value={0.7} icon='heart' /><br />
    <Rating value={0.7} icon='favorite' /><br />
    <Rating value={0.7} icon='favorite_border' /><br />
    <Rating value={0.7} icon='child' /><br />
    <Rating value={0.73} icon='pets' />
  </div>
))
