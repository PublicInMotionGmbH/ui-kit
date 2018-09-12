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
      size: null,
      paneArr: []
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.bindEventListeners = this.bindEventListeners.bind(this)
    this.unbindEventListeners = this.unbindEventListeners.bind(this)
  }

  componentDidMount () {
    const paneArr = []

    // TODO: take size from el to each element
    this.props.children.map((el, i) =>
      paneArr.push({paneId: i, size: this.props.size})
    )
    this.setState({
      paneArr
    })
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
    this.setState({
      current: null,
      currentSize: null
    })
  }

  convertToPercent (size, paneWidth) {
    const result = size * 100 / paneWidth
    return this.roundDecimals(result)
  }

  roundDecimals (num) {
    return Math.round(num * 1000) / 1000
  }

  handleMouseMove (e) {
    const { current } = this.state
    const paneView = ReactDOM.findDOMNode(this['pane_view'])
    const activePane = ReactDOM.findDOMNode(this[`pane_${current}`])
    const nextPane = ReactDOM.findDOMNode(this[`pane_${current + 1}`])
    const { width: paneViewWidth } = paneView.getBoundingClientRect()
    let { left: activeLeft, width: activeWidth } = activePane.getBoundingClientRect()
    const { left: nextLeft, width: nextWidth } = nextPane.getBoundingClientRect()
    let currentSize = e.clientX - activeLeft <= 0 ? 0 : e.clientX - activeLeft
    const newPaneArr = this.state.paneArr

    const activePos = activeLeft + activeWidth
    const nextPos = nextLeft + nextWidth

    if (current === null) return

    newPaneArr.map((el, i) => {
      if (activePos + 12 >= nextPos) {
        return this.convertToPercent(el.size, paneViewWidth)
      }

      if (i === current) {
        el.size = currentSize > 0 ? currentSize : 0
        el.size = this.convertToPercent(el.size, paneViewWidth)
      } else if (i === current + 1) {
        const widthDim = this.roundDecimals(activeWidth) +
        this.roundDecimals(nextWidth) -
        this.roundDecimals(currentSize)
        if (el.size < 0) {
          el.size = 0
        }
        el.size = this.convertToPercent(widthDim, paneViewWidth) + 0.7

        if (currentSize <= 0) {
          return this.convertToPercent(el.size, paneViewWidth)
        }
      }
    })
    this.setState({
      paneArr: newPaneArr,
      currentSize
    })
  }

  render () {
    const { children, className, size, split, style } = this.props
    const { paneArr } = this.state

    const clsName = buildClassName('pane-view', className, [split])

    return (
      <div style={style} className={clsName} ref={node => { this[`pane_view`] = node }}>
        {children.map((child, i) => [
          <Pane
            ref={node => { this[`pane_${i}`] = node }}
            key={`pane_${i}`}
            size={paneArr[i] !== undefined ? paneArr[i].size : this.roundDecimals(size)}
            split={split}
          >
            {child}
          </Pane>,
          (i < children.length - 1) &&
          <Resizer
            key={`resizer_${i}`}
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
