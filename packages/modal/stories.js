import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Modal from './src/Modal'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module, {
  propTables: [ Modal ]
})

addStory('initial', readme, ({ open = false }, setState) => {
  const modalRoot = document.querySelector('body')
  return (
    <div>
      <button onClick={() => { setState({ open: !open }) }}>
        Open Modal
      </button>
      <Modal open={open} attachTo={modalRoot}>
        <h1>Modal</h1>
        <button onClick={() => { setState({ open: false }) }}>
          Close Modal
        </button>
      </Modal>
    </div>
  )
})
