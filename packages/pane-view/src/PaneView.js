import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Pane from './Pane'
import Resizer from './Resizer'

const propTypes = {
  /** Array of pane content */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,

  /** Additional class name */
  className: PropTypes.string,

  /** Size of the pane */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
}

/**
 * Component which represents PaneView.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class PaneView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      current: null,
      size: null
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.bindEventListeners = this.bindEventListeners.bind(this)
    this.unbindEventListeners = this.unbindEventListeners.bind(this)
  }

  componentWillUnmount () {
    this.unbindEventListeners()
  }

  bindEventListeners () {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  unbindEventListeners () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown (index, e) {
    const current = index
    this.setState({ current })

    this.bindEventListeners()
  }

  handleMouseUp () {
    this.unbindEventListeners()
  }

  handleMouseMove (e) {
    const { current } = this.state
    const activePane = ReactDOM.findDOMNode(this[`pane_${current}`])
    const { left } = activePane.getBoundingClientRect()
    const currentSize = e.clientX - left

    this.setState({ currentSize })
  }

  render () {
    const { children, className, size, split, style, ...passedProps } = this.props
    const { current, currentSize } = this.state

    const clsName = buildClassName('pane-view', className, [split])

    return (
      <div className={clsName}>
        {children.map((child, i) => [
          <Pane
            ref={node => { this[`pane_${i}`] = node }}
            key={i}
            size={current === i ? currentSize : size}
            split={split}
          >
            {child}
          </Pane>,
          (i < children.length - 1) &&
          <Resizer
            onMouseDown={this.handleMouseDown.bind(this, i)}
            split={split}
          />
        ])}
      </div>
    )
  }
}

PaneView.displayName = 'PaneView'

PaneView.propTypes = propTypes
PaneView.defaultProps = defaultProps

export default PaneView
