import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import Resizer from './Resizer'

const moduleName = 'pane-view'

const propTypes = {
  /** Array of pane content */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,

  /** Additional class name */
  className: PropTypes.string,

  /** Event fired when mouse button is clicked */
  onMouseDown: PropTypes.func,

  /** Split direction */
  split: PropTypes.oneOf(['horizontal', 'vertical']),

  /** Additional styles for wrapper */
  style: PropTypes.object
}

const defaultProps = {
  split: 'horizontal'
}

/**
 * Component which represents PaneView.
 *
 * @param {object} props
 * @param {node} props.children
 * @param {string} [props.className]
 * @param {function} [props.onMouseDown]
 * @param {string} [props.split]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
class PaneView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      current: null,
      paneArr: [],
      mode: null
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.bindEventListeners = this.bindEventListeners.bind(this)
    this.unbindEventListeners = this.unbindEventListeners.bind(this)
  }

  /**
   * Set sizes for all childrens
   */
  componentDidMount () {
    const { children } = this.props

    if (children === undefined) return

    const paneArr = []
    let defaultSizeAll = 0
    let numberOfNotDefaults = 0

    children.map((el) => {
      if (el.props.defaultSize !== undefined) {
        defaultSizeAll += el.props.defaultSize
      } else {
        numberOfNotDefaults += 1
      }
    })

    const defaultSizeSingle = (100 - defaultSizeAll) / numberOfNotDefaults

    children.map((el, i) => {
      paneArr.push({
        paneId: i,
        size: el.props.defaultSize !== undefined
          ? el.props.defaultSize
          : defaultSizeSingle})
    })

    this.setState({
      paneArr
    })
  }

  /**
   * Handle componentWillUnmount
   */
  componentWillUnmount () {
    this.unbindEventListeners()
  }

  /**
   * Bind event listeners
   */
  bindEventListeners () {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  /**
   * Unbind event listeners
   */
  unbindEventListeners () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  /**
   * Handle mouse down
   * @param {number} index
   */
  handleMouseDown (index) {
    const { onMouseDown } = this.props
    const current = index
    this.setState({
      current,
      mode: 'start'
    })

    if (onMouseDown) {
      onMouseDown('start')
    }

    this.bindEventListeners()
  }

  /**
   * Handle mouse up
   */
  handleMouseUp () {
    const { onMouseDown } = this.props

    this.unbindEventListeners()

    this.setState({
      current: null,
      mode: 'stop'
    })

    if (onMouseDown) {
      onMouseDown('stop')
    }
  }

  /**
   * Convert to percent
   *
   * @param {number} size
   * @param {number} paneViewDimension
   * @returns {number}
   */
  convertToPercent (size, paneViewDimension) {
    let result = size * 100 / paneViewDimension
    if (result < 0) {
      result = 0
    } else if (result > 100) {
      result = 100
    }
    return this.roundDecimals(result)
  }

  /**
   * Round number
   *
   * @param {number} num
   * @returns {number}
   */
  roundDecimals (num) {
    return Math.round(num * 10000) / 10000
  }

  /**
   * Handle mouse move
   *
   * @param {*} e
   */
  handleMouseMove (e) {
    const { current, paneArr: newPaneArr } = this.state
    const { split, children, onMouseDown } = this.props
    const paneView = ReactDOM.findDOMNode(this['pane_view'])
    const activePane = ReactDOM.findDOMNode(this[`pane_${current}`])
    const nextPane = ReactDOM.findDOMNode(this[`pane_${current + 1}`])
    const resizer = ReactDOM.findDOMNode(this[`resizer_0`])
    const {width: resizerWidth, height: resizerHeight} = resizer.getBoundingClientRect()
    const {width: paneViewWidth, height: paneViewHeight} = paneView.getBoundingClientRect()
    const {width: nextWidth, height: nextHeight} = nextPane.getBoundingClientRect()
    const {
      left: activeLeft,
      width: activeWidth,
      top: activeTop,
      height: activeHeight
    } = activePane.getBoundingClientRect()
    const resizersNumber = children.length - 1
    const realPaneViewWidth = paneViewWidth - (resizersNumber * resizerWidth)
    const realPaneViewHeight = paneViewHeight - (resizersNumber * resizerHeight)
    const currentSizeHorizontal = e.clientX - activeLeft <= 0 ? 0 : e.clientX - activeLeft
    const currentSizeVertical = e.clientY - activeTop <= 0 ? 0 : e.clientY - activeTop
    const activeOffsetWidthPercent = this.convertToPercent(activePane.offsetWidth, realPaneViewWidth)
    const activeOffsetHeightPercent = this.convertToPercent(activePane.offsetHeight, realPaneViewHeight)
    const widthCombined = this.roundDecimals(activeWidth) +
      this.roundDecimals(nextWidth) -
      this.roundDecimals(currentSizeHorizontal)
    const heightCombined = this.roundDecimals(activeHeight) +
      this.roundDecimals(nextHeight) -
      this.roundDecimals(currentSizeVertical)

    if (onMouseDown) {
      onMouseDown('resize')
    }

    if (current === null) return

    if (split === 'horizontal') {
      newPaneArr.map((el, i) => {
        if (i === current) {
          el.size = currentSizeHorizontal > 0 ? currentSizeHorizontal : 0
          el.size = this.convertToPercent(el.size, realPaneViewWidth)
          if (widthCombined < 0) {
            el.size = activeOffsetWidthPercent + 0.07
          }
        } else if (i === current + 1) {
          el.size = this.convertToPercent(widthCombined, realPaneViewWidth) + 0.07
        }
      })
    }

    if (split === 'vertical') {
      newPaneArr.map((el, i) => {
        if (i === current) {
          el.size = currentSizeVertical > 0 ? currentSizeVertical : 0
          el.size = this.convertToPercent(el.size, realPaneViewHeight)
          if (heightCombined <= 0) {
            el.size = activeOffsetHeightPercent
          }
        } else if (i === current + 1) {
          el.size = this.convertToPercent(heightCombined, realPaneViewHeight) + 0.07
        }
      })
    }

    this.setState({
      paneArr: newPaneArr,
      currentSizeVertical,
      currentSizeHorizontal,
      mode: 'resize'
    })
  }

  render () {
    const { children, className, split, style } = this.props
    const { paneArr } = this.state

    const clsName = buildClassName(moduleName, className, [split])

    return (
      <div style={style} className={clsName} ref={node => { this[`pane_view`] = node }}>
        {children && children.map((child, i) =>
          <React.Fragment key={i}>
            {React.cloneElement(child, {
              ref: node => { this[`pane_${i}`] = node },
              key: `pane_${i}`,
              size: paneArr[i] && paneArr[i].size !== undefined
                ? paneArr[i].size
                : this.roundDecimals(100 / children.length),
              split: split
            })}
            {(i < children.length - 1) &&
              <Resizer
                ref={node => { this[`resizer_${i}`] = node }}
                key={`resizer_${i}`}
                onMouseDown={this.handleMouseDown.bind(this, i)}
                split={split}
              />}
          </React.Fragment>
        )}
      </div>
    )
  }
}

PaneView.displayName = 'PaneView'

PaneView.propTypes = propTypes
PaneView.defaultProps = defaultProps

export default PaneView
