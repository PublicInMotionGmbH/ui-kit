import React from 'react'

import { action } from '@storybook/addon-actions'

class Controller extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.initialState
    props.register(this)
  }

  render () {
    return this.props.render()
  }
}

const emitSetStateAction = action('setState')

function createController (func, getInitialState = () => {}) {
  const state = getInitialState()

  const components = []

  const register = e => components.push(e)
  const update = () => components.forEach(c => c.forceUpdate())
  const render = () => func(setState, state)

  function setState (nextState) {
    Object.assign(state, nextState)
    emitSetStateAction(nextState)
    update()
  }

  const Control = class extends Controller {}

  Control.defaultProps = {
    register: register,
    render: render
  }

  return () => (
    <Control initialState={state}>
      {render()}
    </Control>
  )
}

export default createController
