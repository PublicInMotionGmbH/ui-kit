import React from 'react'

import Modal from './src/Modal'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module)

const render = (setState, state) => {
  return (
    <div>
      <button onClick={() => { setState({ isOpen: !state.isOpen }) }}>
        Open Modal
      </button>
      <Modal isOpen={state.isOpen} size={state.size}>
        <h1>Modal {state.size}</h1>
        <button onClick={() => { setState({ isOpen: false }) }}>
          Close Modal
        </button>
      </Modal>
    </div>
  )
}
const getInitialStateDefault = () => {
  return {
    isOpen: false
  }
}

const getInitialStateSmall = () => {
  return {
    isOpen: false,
    size: 'small'
  }
}
const getInitialStateMedium = () => {
  return {
    isOpen: false,
    size: 'medium'
  }
}
const getInitialStateLarge = () => {
  return {
    isOpen: false,
    size: 'large'
  }
}

addStory.controlled('initial', readme, render, getInitialStateDefault)
addStory.controlled('small', readme, render, getInitialStateSmall)
addStory.controlled('medium', readme, render, getInitialStateMedium)
addStory.controlled('large', readme, render, getInitialStateLarge)
