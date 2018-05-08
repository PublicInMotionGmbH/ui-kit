import React from 'react'
import PropTypes from 'prop-types'

import { Navigation, ControlledPagination } from '@talixo/navigation'
import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children inside Wizard. Each child is the next step in Wizard */
  children: PropTypes.node,

  /** Maximum number of displayed page buttons */
  displayedLimit: PropTypes.number,

  /** Next button label */
  nextLabel: PropTypes.node,

  /** Previous button label */
  previousLabel: PropTypes.node
}

/**
 * Component which represents Wizard.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {number} [props.displayedLimit]
 * @property {string} [props.nextLabel]
 * @property {string} [props.previousLabel]
 * @class {React.Element}
 */
class Wizard extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentStep: 1
    }
  }

  render () {
    const {children, className, displayedLimit, nextLabel, previousLabel, ...passedProps} = this.props
    const {currentStep} = this.state
    return (
      <div className={buildClassName('wizard', className)} {...passedProps} >
        {children[currentStep - 1]}
        <Navigation type='pagination' >
          <ControlledPagination
            activePage={currentStep}
            displayedLimit={displayedLimit}
            nextLabel={nextLabel}
            onChange={i => this.setState({ currentStep: i })}
            pageCount={children.length}
            previousLabel={previousLabel}
          />
        </Navigation>
      </div>
    )
  }
}

Wizard.propTypes = propTypes

export default Wizard
