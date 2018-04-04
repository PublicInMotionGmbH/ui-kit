import React from 'react'

import Modal from './src/Modal'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module)

const render = (setState, state) => {
  const modalRoot = document.querySelector('body')
  return (
    <div>
      <button onClick={() => { setState({ open: !state.open }) }}>
        Open Modal
      </button>
      <Modal open={state.open} attachTo={modalRoot}>
        <h1>Modal</h1>
        <button onClick={() => { setState({ open: false }) }}>
          Close Modal
        </button>
      </Modal>
    </div>
  )
}
const getInitialState = () => {
  return {
    open: false
  }
}

addStory.controlled('initial', readme, render, getInitialState)
