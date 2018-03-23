import React from 'react'

import { action } from '@storybook/addon-actions'

/**
 * Wrapping React component to handle state changes
 */
class Controller extends React.Component {
  /**
   * @param {object|{ register: function, initialState: object, render: function }} props
   */
  constructor (props) {
    super(props)
    this.state = props.initialState
    props.register(this)
  }

  componentDidMount () {
    this.props.register(this)
  }

  componentWillUnmount () {
    this.props.unregister(this)
  }

  render () {
    return this.props.render()
  }
}

// Prepare Storybook action to emit 'setState' event on change
const emitSetStateAction = action('setState')

/**
 * Helper to create controlled components,
 * which will have its source code shown properly in Storybook
 *
 * @param {function} func
 * @param {function} [getInitialState]
 * @returns {function(): function(): React.Element}
 */
function createController (func, getInitialState = () => ({})) {
  const state = getInitialState() || {}

  // Create list of register controllers to update
  const components = []

  // Build some required functions
  const register = e => components.push(e)
  const update = () => components.forEach(c => c.forceUpdate())
  const render = () => func(setState, state)
  const unregister = e => {
    const index = components.indexOf(e)

    if (index !== -1) {
      components.splice(index, 1)
    }
  }

  // Build function to set new state
  function setState (nextState) {
    Object.assign(state, nextState)
    emitSetStateAction(nextState)
    update()
  }

  // Create wrapper to show it better way in source code (without register/render fields)
  const Control = class extends Controller {}

  // Set these default properties
  Control.defaultProps = {
    unregister: unregister,
    register: register,
    render: render
  }

  // Return a function required by addon-info
  function build () {
    return (
      <Control initialState={state}>
        {render()}
      </Control>
    )
  }

  // And extract also Controller to ignore it in propTypes
  build.Controller = Control

  return build
}

export default createController
