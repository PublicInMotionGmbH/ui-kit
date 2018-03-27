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
      <Modal isOpen={state.isOpen}>
        <h1>Modal</h1>
        <button onClick={() => { setState({ isOpen: false }) }}>
          Close Modal
        </button>
      </Modal>
    </div>
  )
}
const getInitialState = () => {
  return {
    isOpen: false
  }
}

addStory.controlled('initial', readme, render, getInitialState)
