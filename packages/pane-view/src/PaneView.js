import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { convertToPercent, composeNewPaneList } from '../utils/utils'

import Resizer from './Resizer'

const moduleName = 'pane-view'

const propTypes = {
  /** Array of Pane components */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,

  /** Additional class name */
  className: PropTypes.string,

  /** Function fired when Pane is resized */
  onResize: PropTypes.func,

  /** Function fired when Pane is started to drag */
  onDragStart: PropTypes.func,

  /** Function fired when Pane is dragged */
  onDragResize: PropTypes.func,

  /** Function fired when Pane is stopped to drag */
  onDragStop: PropTypes.func,

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
 * @param {function} [props.onDragResize]
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
      paneArr: []
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

    const paneArr = children.map((el, i) => ({
      paneId: i,
      size: el.props.defaultSize !== undefined
        ? el.props.defaultSize
        : defaultSizeSingle
    }))

    this.setState({
      paneArr
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
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  /**
   * Remove event listeners
   */
  removeEventListeners () {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  /**
   * Handle mouse down
   * @param {number} index
   */
  handleMouseDown (index) {
    const { onDragStart } = this.props

    this.setState({
      current: index
    })

    if (onDragStart) {
      onDragStart(index)
    }

    this.addEventListeners()
  }

  /**
   * Handle mouse up
   */
  handleMouseUp () {
    const { onDragStop } = this.props
    const { current } = this.state

    this.removeEventListeners()

    if (onDragStop) {
      onDragStop(current)
    }

    this.setState({
      current: null,
      currentSizeVertical: null,
      currentSizeHorizontal: null
    })
  }

  /**
   * Handle mouse move
   *
   * @param {*} e
   */
  handleMouseMove (e) {
    const { current } = this.state
    let { paneArr } = this.state
    const { split, children, onDragResize, onResize } = this.props
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
    const realPaneViewWidth = paneViewWidth - (resizersNumber * resizerWidth)
    const realPaneViewHeight = paneViewHeight - (resizersNumber * resizerHeight)
    const currentSizeHorizontal = e.clientX - activeLeft <= 0 ? 0 : e.clientX - activeLeft
    const currentSizeVertical = e.clientY - activeTop <= 0 ? 0 : e.clientY - activeTop
    const activeOffsetWidthPercent = convertToPercent(activePane.getBoundingClientRect().width,
      realPaneViewWidth)
    const activeOffsetHeightPercent = convertToPercent(activePane.getBoundingClientRect().height,
      realPaneViewHeight)
    const widthCombined = activeWidth + nextWidth - currentSizeHorizontal
    const heightCombined = activeHeight + nextHeight - currentSizeVertical

    if (current === null || !paneArr) return

    if (split === 'horizontal') {
      paneArr = composeNewPaneList(
        paneArr,
        current,
        currentSizeHorizontal,
        realPaneViewWidth,
        widthCombined,
        activeOffsetWidthPercent
      )
    } else if (split === 'vertical') {
      paneArr = composeNewPaneList(
        paneArr,
        current,
        currentSizeVertical,
        realPaneViewHeight,
        heightCombined,
        activeOffsetHeightPercent
      )
    }

    if (onDragResize) {
      onDragResize()
    }

    if (onResize) {
      onResize(current, { width: activeWidth, height: activeHeight })
    }

    this.setState({
      paneArr,
      currentSizeVertical,
      currentSizeHorizontal
    })
  }

  render () {
    const { children, className, split, style } = this.props
    const { paneArr } = this.state
    const clsName = buildClassName(moduleName, className, [split])

    return (
      <div style={style} className={clsName} ref={node => { this.paneView = node }}>
        {children && children.map((child, i) =>
          <React.Fragment key={i}>
            {React.cloneElement(child, {
              ref: node => { this.panes[i] = node },
              key: `pane_${i}`,
              size: paneArr[i] && paneArr[i].size,
              split: split
            })}
            {(i < children.length - 1) &&
              <Resizer
                ref={node => { this.resizers[i] = node }}
                key={this.resizers[i]}
                onMouseDown={() => this.handleMouseDown(i)}
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
