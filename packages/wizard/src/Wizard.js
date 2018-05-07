import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Wizard.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class Wizard extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 0
    }

    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }

  _next () {
    let currentStep = this.state.currentStep
    if (currentStep >= 1) {
      currentStep = 2
    } else {
      currentStep = currentStep + 1
    }

    this.setState({
      currentStep: currentStep
    })
  }

  _prev () {
    let currentStep = this.state.currentStep
    if (currentStep <= 0) {
      currentStep = 0
    } else {
      currentStep = currentStep - 1
    }

    this.setState({
      currentStep: currentStep
    })
  }

  /*   _actualStep () {
    return {

    }
  } */

  render () {
    const {children, className, ...passedProps} = this.props
    const {currentStep} = this.state
    return (
      <div className={buildClassName('wizard', className)} {...passedProps} >
        <div>
          {/* {this._actualStep()} */}
          {children[currentStep]}
        </div>

        <button onClick={this._prev}>Prev</button>
        <button onClick={this._next}>Next</button>
      </div>
    )
  }
}

Wizard.propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

Wizard.defaultProps = {
}

export default Wizard
