import React from 'react'

import { Button } from '@talixo/button'

import Modal from './src/Modal'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module, {
  propTypes: [ Modal ],
  propTablesExclude: [ Button ]
})

const render = (setState, state) => {
  const modalRoot = document.querySelector('body')
  return (
    <div>
      <Button onClick={() => { setState({ isOpen: !state.isOpen }) }}>
        Open Modal
      </Button>
      <Modal isOpen={state.isOpen} root={modalRoot}>
        <h1>Modal</h1>
        <Button onClick={() => { setState({ isOpen: false }) }}>
          Close Modal
        </Button>
      </Modal>
    </div>
  )
}

const getInitialState = () => {
  return {
    isOpen: false
  }
}

addStory.controlled('default', readme, render, getInitialState)
