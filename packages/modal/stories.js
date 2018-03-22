import React from 'react'

import Modal from './src/Modal'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isOpenSmall: false,
      isOpenMedium: false,
      isOpenLarge: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (size) {
    this.setState({ [`isOpen${size}`]: !this.state[`isOpen${size}`] })
  }

  render () {
    const { isOpenSmall, isOpenMedium, isOpenLarge } = this.state
    const { toggleModal } = this
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button color='primary' onClick={toggleModal.bind(this, 'Small')}>Open small modal</button>
          <Modal size='small' isOpen={isOpenSmall}>
            <h2>Modal</h2>
            <button onClick={toggleModal.bind(this, 'Small')} type='button'>Close modal</button>
          </Modal>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <button color='primary' onClick={toggleModal.bind(this, 'Medium')}>Open medium modal</button>
          <Modal size='medium' isOpen={isOpenMedium}>
            <h2>Modal</h2>
            <button onClick={toggleModal.bind(this, 'Medium')} type='button'>Close modal</button>
          </Modal>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <button color='primary' onClick={toggleModal.bind(this, 'Large')}>Open large modal</button>
          <Modal size='large' isOpen={isOpenLarge}>
            <h2>Modal</h2>
            <button onClick={toggleModal.bind(this, 'Large')} type='button'>Close modal</button>
          </Modal>
        </div>
      </div>
    )
  }
}

addStory('modal', readme, () => <App />)
