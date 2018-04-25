import React from 'react'
import { ScaleUtils, AbstractSeries } from 'react-vis'

/**
 * UI component that represents hightlighted drawing area above a Chart component
 * This is a copy of solution provided by react-vis team
 * https://github.com/uber/react-vis/blob/master/showcase/examples/zoomable-chart/highlight.js
 * @property {object} [state]
 * @property {bool} [state.drawing]
 * @property {object} [state.drawArea]
 * @property {number} [state.drawArea.top]
 * @property {number} [state.drawArea.right]
 * @property {number} [state.drawArea.bottom]
 * @property {number} [state.drawArea.left]
 * @property {number} [state.start.loc]
 * @class
 */
class Highlight extends AbstractSeries {
  state = {
    drawing: false,
    drawArea: { top: 0, right: 0, bottom: 0, left: 0 },
    startLoc: 0
  }

  _getDrawArea (loc) {
    const { innerWidth } = this.props
    const { drawArea, startLoc } = this.state

    if (loc < startLoc) {
      const area = {
        ...drawArea,
        left: Math.max(loc, 0),
        right: startLoc
      }
      return area
    }

    const area = {
      ...drawArea,
      right: Math.min(loc, innerWidth),
      left: startLoc
    }
    return area
  }

  onParentMouseDown (e) {
    const { marginLeft, innerHeight, onBrushStart } = this.props
    let offsetX = e.nativeEvent.offsetX
    if (e.nativeEvent.type === 'touchstart') {
      offsetX = e.nativeEvent.pageX
    }
    const location = offsetX - marginLeft

    this.setState({
      drawing: true,
      drawArea: {
        top: 0,
        right: location,
        bottom: innerHeight,
        left: location
      },
      startLoc: location
    })

    if (onBrushStart) {
      onBrushStart(e)
    }
  }

  stopDrawing () {
    // Quickly short-circuit if the user isn't drawing in our component
    if (!this.state.drawing) {
      return
    }

    const { onBrushEnd } = this.props
    const { drawArea } = this.state
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x')
    const yScale = ScaleUtils.getAttributeScale(this.props, 'y')

    // Clear the draw area
    this.setState({
      drawing: false,
      drawArea: { top: 0, right: 0, bottom: 0, left: 0 },
      startLoc: 0
    })

    // Invoke the callback with null if the selected area was < 5px
    if (Math.abs(drawArea.right - drawArea.left) < 5) {
      onBrushEnd(null)
      return
    }

    // Compute the corresponding domain drawn
    const domainArea = {
      top: yScale.invert(drawArea.top),
      right: xScale.invert(drawArea.right),
      bottom: yScale.invert(drawArea.bottom),
      left: xScale.invert(drawArea.left)
    }

    if (onBrushEnd) {
      onBrushEnd(domainArea)
    }
  }

  onParentMouseMove (e) {
    const {marginLeft, onBrush} = this.props
    const {drawing} = this.state
    let offsetX = e.nativeEvent.offsetX
    if (e.nativeEvent.type === 'touchmove') {
      offsetX = e.nativeEvent.pageX
    }
    const loc = offsetX - marginLeft

    if (drawing) {
      const newDrawArea = this._getDrawArea(loc)
      this.setState({drawArea: newDrawArea})

      if (onBrush) {
        onBrush(e)
      }
    }
  }

  render () {
    const {
      marginLeft,
      marginTop,
      innerWidth,
      innerHeight,
      color,
      opacity
    } = this.props
    const { drawArea: { left, right, top, bottom } } = this.state

    return (
      <g
        transform={`translate(${marginLeft}, ${marginTop})`}
        className='highlight-container'
        onMouseUp={() => this.stopDrawing()}
        onMouseLeave={() => this.stopDrawing()}
        // preventDefault() so that mouse event emulation does not happen
        onTouchEnd={(e) => {
          e.preventDefault()
          this.stopDrawing()
        }}
        onTouchCancel={(e) => {
          e.preventDefault()
          this.stopDrawing()
        }}
      >
        <rect
          className='mouse-target'
          fill='black'
          opacity='0'
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
        />
        <rect
          className='highlight'
          pointerEvents='none'
          opacity={opacity}
          fill={color}
          x={left}
          y={top}
          width={right - left}
          height={bottom}
        />
      </g>
    )
  }
}

Highlight.displayName = 'HighlightOverlay'

Highlight.defaultProps = {
  allow: 'x',
  color: 'rgb(77, 182, 172)',
  opacity: 0.3
}

export default Highlight
