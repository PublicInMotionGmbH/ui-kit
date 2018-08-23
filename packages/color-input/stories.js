import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ColorInput from './src/ColorInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('ColorInput', module, {
  propTables: [ ColorInput ]
})

const palette = [
  {
    id: 'red1',
    name: 'awesome-red',
    color: '#f00'
  },
  {
    id: 'blue2',
    name: 'fantastic-blue',
    color: '#0004d0'
  },
  {
    id: 'green3',
    name: 'fresh-green',
    color: '#00c41c'
  },
  {
    id: 'gold4',
    name: 'luxury-gold',
    color: '#d7b10c'
  },
  {
    id: 'violet5',
    name: 'elegant-violet',
    color: 'hsl(278,100%,50%)'
  },
  {
    id: 'cyan6',
    name: 'future-cyan',
    color: 'rgb(1, 217, 200)'
  },
  {
    id: 'orange7',
    name: 'fruity-yellow',
    color: 'rgb(224, 223, 0)'
  },
  {
    id: 'black8',
    name: 'dark-black',
    color: 'rgb(2, 0, 5)'
  }
]

// Styles for elements
const additionalStyling = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 400,
  height: 70,
  fontSize: '2em',
  borderSize: 0.1,
  borderStyle: 'solid',
  borderRadius: 7,
  marginBottom: 8
}

const buttonStyle = {
  height: 60,
  width: 90,
  borderStyle: 'none',
  borderRadius: 4,
  marginRight: 7,
  marginBottom: 12
}

// Stories

addStory('initial', readme, () => (
  <ColorInput />
))

addStory('with set default color', readme, () => (
  <ColorInput defaultColor='#ff0000' />
))

addStory('with alpha channel', readme, () => (
  <ColorInput alpha />
))

addStory('with HSL manipulation', readme, () => (
  <ColorInput hsl />
))

addStory('with palette of colors', readme, () => (
  <ColorInput palette={palette} />
))

addStory('full version', readme, () => (
  <ColorInput alpha hsl palette={palette} />
))

addStory('rgb as output format', readme, () => (
  <ColorInput outputFormat='rgb' alpha hsl palette={palette} />
))

addStory('hex as output format', readme, () => (
  <ColorInput outputFormat='hex' alpha hsl palette={palette} />
))

addStory('hsl as output format', readme, () => (
  <ColorInput outputFormat='hsl' alpha hsl palette={palette} />
))

addStory.controlled('retrieve color from outside', readme, (setState, state) => (
  <div>
    <div style={{
      ...additionalStyling,
      color: state.value,
      borderColor: state.value
    }}>
      I'm outside the component
    </div>
    <ColorInput
      alpha
      hsl
      palette={palette}
      onChange={value => setState({ value })}
    />
  </div>
), () => ({ value: '#654321' }))

addStory.controlled('controlled', readme, (setState, state) => (
  <div>
    <button
      style={{
        ...buttonStyle,
        backgroundColor: '#ff4422'
      }}
      onClick={() => setState({
        value: '#ff4422'
      })
      }
    >
      Click me
    </button>
    <button
      style={{
        ...buttonStyle,
        backgroundColor: 'rgb(100, 217, 100)'
      }}
      onClick={() => setState({
        value: 'rgb(100, 217, 100)'
      })
      }
    >
      Click me
    </button>
    <button
      style={{
        ...buttonStyle,
        backgroundColor: 'hsl(278,100%,50%)'
      }}
      onClick={() => setState({
        value: 'hsl(278,100%,50%)'
      })
      }
    >
      Click me
    </button>
    <ColorInput
      alpha
      hsl
      palette={palette}
      value={state.value}
    />
  </div>
), () => ({ value: '#abcdef' }))
