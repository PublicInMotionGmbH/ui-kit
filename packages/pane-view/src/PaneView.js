import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName, prefix } from '@talixo/shared'

import { composeNewPaneList, isTouchDevice } from '../utils'

import Resizer from './Resizer'

const moduleName = 'pane-view'
const prefixedModuleName = prefix(moduleName)

const propTypes = {
  /** Array of Pane components */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,

  /** Additional class name */
  className: PropTypes.string,

  /** Function fired when Pane is resized, return resizer's index and current dimensions of pane */
  onResize: PropTypes.func,

  /** Function fired when Pane is started to resize */
  onStartResize: PropTypes.func,

  /** Function fired when Pane is stopped to resize */
  onStopResize: PropTypes.func,

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
 * @param {function} [props.onResize]
 * @param {function} [props.onDragStart]
 * @param {function} [props.onDragStop]
 * @param {string} [props.split]
 * @param {object} [props.style]
 * @returns {React.Element}
 */
class PaneView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      current: null,
      paneList: []
    }

    this.resizers = []
    this.panes = []
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.addEventListeners = this.addEventListeners.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
  }

  /**
   * Set sizes for all childrens
   */
  componentDidMount () {
    const { children } = this.props

    if (children === undefined) return

    let defaultSizeAll = 0
    let numberOfNotDefaults = 0

    children.forEach((el) => {
      if (el.props.defaultSize !== undefined) {
        defaultSizeAll += el.props.defaultSize
      } else {
        numberOfNotDefaults += 1
      }
    })

    const defaultSizeSingle = (100 - defaultSizeAll) / numberOfNotDefaults

    const paneList = children.map((el, i) => ({
      paneId: i,
      size: el.props.defaultSize !== undefined
        ? el.props.defaultSize
        : defaultSizeSingle
    }))

    this.setState({
      paneList
    })
  }

  /**
   * Handle componentWillUnmount
   */
  componentWillUnmount () {
    this.removeEventListeners()
  }

  /**
   * Add event listeners
   */
  addEventListeners () {
    if (isTouchDevice()) {
      window.addEventListener('touchmove', this.handleMouseMove)
      window.addEventListener('touchend', this.handleMouseUp)
    } else {
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  }

  /**
   * Remove event listeners
   */
  removeEventListeners () {
    if (isTouchDevice()) {
      window.removeEventListener('touchmove', this.handleMouseMove)
      window.removeEventListener('touchend', this.handleMouseUp)
    } else {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }

  /**
   * Handle mouse down
   * @param {number} index
   */
  handleMouseDown (index) {
    const { onStartResize } = this.props

    this.setState({
      current: index
    })

    if (onStartResize) {
      onStartResize(index)
    }

    if (isTouchDevice()) {
      document.body.classList.add(`${prefixedModuleName}--resize-active`)
    }

    this.addEventListeners()
  }

  /**
   * Handle mouse up
   */
  handleMouseUp () {
    const { onStopResize } = this.props
    const { current } = this.state

    this.removeEventListeners()

    if (onStopResize) {
      onStopResize(current)
    }

    this.setState({
      current: null,
      currentSizeVertical: null,
      currentSizeHorizontal: null
    })

    if (isTouchDevice()) {
      document.body.classList.remove(`${prefixedModuleName}--resize-active`)
    }
  }

  /**
   * Handle mouse move
   *
   * @param {*} e
   */
  handleMouseMove (e) {
    const { current } = this.state
    let { paneList } = this.state
    const { split, children, onResize } = this.props
    const paneView = ReactDOM.findDOMNode(this.paneView)
    const activePane = ReactDOM.findDOMNode(this.panes[current])
    const nextPane = ReactDOM.findDOMNode(this.panes[current + 1])
    const resizer = ReactDOM.findDOMNode(this.resizers[0])
    const { width: resizerWidth, height: resizerHeight } = resizer.getBoundingClientRect()
    const { width: paneViewWidth, height: paneViewHeight } = paneView.getBoundingClientRect()
    const { width: nextWidth, height: nextHeight } = nextPane.getBoundingClientRect()
    const {
      left: activeLeft,
      width: activeWidth,
      top: activeTop,
      height: activeHeight
    } = activePane.getBoundingClientRect()
    const resizersNumber = children.length - 1
    const allPanesSummedWidth = paneViewWidth - (resizersNumber * resizerWidth)
    const allPanesSummedHeight = paneViewHeight - (resizersNumber * resizerHeight)
    const widthCombined = activeWidth + nextWidth
    const heightCombined = activeHeight + nextHeight
    let currentSizeHorizontal
    let currentSizeVertical
    if (isTouchDevice()) {
      currentSizeHorizontal = e.changedTouches[0].clientX - activeLeft <= 0
        ? 0
        : e.changedTouches[0].clientX - activeLeft
      currentSizeVertical = e.changedTouches[0].clientY - activeTop <= 0
        ? 0
        : e.changedTouches[0].clientY - activeTop
    } else {
      currentSizeHorizontal = e.clientX - activeLeft <= 0
        ? 0
        : e.clientX - activeLeft
      currentSizeVertical = e.clientY - activeTop <= 0
        ? 0
        : e.clientY - activeTop
    }

    if (current === null || !paneList) return

    if (split === 'horizontal') {
      paneList = composeNewPaneList(
        paneList,
        current,
        currentSizeHorizontal,
        allPanesSummedWidth,
        widthCombined
      )
    } else if (split === 'vertical') {
      paneList = composeNewPaneList(
        paneList,
        current,
        currentSizeVertical,
        allPanesSummedHeight,
        heightCombined
      )
    }

    if (onResize) {
      onResize(current, { width: activeWidth, height: activeHeight })
    }

    this.setState({
      paneList,
      currentSizeVertical,
      currentSizeHorizontal
    })
  }

  render () {
    const { children, className, split, style } = this.props
    const { paneList } = this.state
    const clsName = buildClassName(moduleName, className, [split])

    return (
      <div style={style} className={clsName} ref={node => { this.paneView = node }}>
        {children && children.map((child, i) =>
          <React.Fragment key={i}>
            {React.cloneElement(child, {
              ref: node => { this.panes[i] = node },
              key: `pane_${i}`,
              size: paneList[i] && paneList[i].size,
              split: split
            })}
            {(i < children.length - 1) &&
              <Resizer
                ref={node => { this.resizers[i] = node }}
                key={this.resizers[i]}
                onMouseDown={() => this.handleMouseDown(i)}
                onTouchStart={() => this.handleMouseDown(i)}
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
