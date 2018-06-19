import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Carousel from './src/Carousel'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Carousel', module, {
  propTables: [ Carousel ]
})

// Styles for stories
const wrapperStyle = {
  height: '200px',
  display: 'flex'
}
const imagesStyle = {
  display: 'inline-block',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  fontSize: '30px',
  padding: '30px',
  boxSizing: 'border-box',
  backgroundColor: '#3da23d',
  border: '5px solid #000'
}
const customDotsWrapperStyles = {
  position: 'absolute',
  display: 'flex',
  width: '100%',
  bottom: '0',
  justifyContent: 'center'
}
const customDotsStyles = {
  display: 'inline-block',
  position: 'relative',
  height: '50px',
  width: '50px',
  margin: '15px',
  borderRadius: '50%',
  fontSize: '20px',
  cursor: 'pointer',
  backgroundColor: '#009de2',
  border: '1px solid #0ff8ff',
  color: '#4c0361',
  textAlign: 'center',
  lineHeight: '50px'
}

// Custom dots
function customDots (props) {
  const { children, onChange } = props
  const dotsNumber = Math.ceil(children.length)

  let elements = []
  for (let i = 0; i < dotsNumber; i++) {
    elements.push(<div key={i} style={customDotsStyles} onClick={() => onChange(i)}>{i + 1}</div>)
  }
  return (
    <div style={customDotsWrapperStyles}>{elements}</div>
  )
}

// Custom wrapper component with automatic sliding
class CustomWrapperComponent extends React.PureComponent {
  componentDidMount () {
    if (this.child) {
      setInterval(this.child.handlerNext, this.props.interval)
    }
  }

  render () {
    return (
      <div style={wrapperStyle}>
        <Carousel ref={instance => { this.child = instance }}>
          <div style={imagesStyle}>SLIDE 1</div>
          <div style={imagesStyle}>SLIDE 2</div>
          <div style={imagesStyle}>SLIDE 3</div>
        </Carousel>
      </div>
    )
  }
}

// Stories
addStory('initial', readme, () => (
  <div style={wrapperStyle}>
    <Carousel>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
    </Carousel>
  </div>

))

addStory('with arrows', readme, () => (
  <div style={wrapperStyle}>
    <Carousel arrows>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
    </Carousel>
  </div>
))

addStory('with more elements in one slide', readme, () => (
  <div style={wrapperStyle}>
    <Carousel arrows perPage={3}>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
      <div style={imagesStyle}>SLIDE 4</div>
      <div style={imagesStyle}>SLIDE 5</div>
      <div style={imagesStyle}>SLIDE 6</div>
      <div style={imagesStyle}>SLIDE 7</div>
    </Carousel>
  </div>
))

addStory('with dots', readme, () => (
  <div style={wrapperStyle}>
    <Carousel arrows dots>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
    </Carousel>
  </div>
))

addStory('with more elements & dots', readme, () => (
  <div style={wrapperStyle}>
    <Carousel dots perPage={3}>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
      <div style={imagesStyle}>SLIDE 4</div>
      <div style={imagesStyle}>SLIDE 5</div>
      <div style={imagesStyle}>SLIDE 6</div>
      <div style={imagesStyle}>SLIDE 7</div>
    </Carousel>
  </div>
))

addStory('with custom dots', readme, () => (
  <div style={wrapperStyle}>
    <Carousel dots renderDots={customDots}>
      <div style={imagesStyle}>SLIDE 1</div>
      <div style={imagesStyle}>SLIDE 2</div>
      <div style={imagesStyle}>SLIDE 3</div>
    </Carousel>
  </div>
))

addStory('Custom wrapper component with automatic sliding', readme, () => (
  <CustomWrapperComponent interval={2500} />
))
