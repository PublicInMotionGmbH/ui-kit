import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Slider } from '@talixo/slider'

import convertHslToRgbHex from '../utils/convertHslToRgbHex'
import convertRgbToHsl from '../utils/convertRgbToHsl'

const moduleName = 'color-input__hsl'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Currently selected color */
  color: PropTypes.string,

  /** Send color back to parent component */
  onHslChange: PropTypes.func,

  /** Output format */
  outputFormat: PropTypes.string
}

/**
* Component which represents Hsl.
*
* @property {object} props
* @property {string} [props.color]
*
* @class {React.Element}
*/
class Hsl extends React.Component {
  state = {
    controlledInside: false,
    h: 0,
    s: 0,
    l: 0
  }

  componentDidMount () {
    this.handleHslCalculation(this.props.color)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.color !== this.props.color && !this.state.controlledInside) {
      this.handleHslCalculation(nextProps.color)
    }
  }

  handleMouseDown () {
    this.setState({
      controlledInside: true
    })
  }

  handleMouseUp () {
    this.setState({
      controlledInside: false
    })
  }

  /**
   * Handle HSL change
   * @param {number} h
   * @param {number} s
   * @param {number} l
   */
  handleChangeHsl (h, s, l) {
    this.setState({
      h: h,
      s: s,
      l: l
    })

    const { color, outputFormat } = this.props

    if (color && (color.startsWith('hsl') || outputFormat === 'hsl')) {
      this.props.onHslChange(`hsl(${h},${s}%,${l}%)`)
      return
    }

    const newColor = convertHslToRgbHex(h, s, l, color, outputFormat)

    if (!newColor) {
      this.props.onHslChange(color, true)
    } else {
      this.props.onHslChange(newColor)
    }
  }

  /**
   * Handle HSL button click
   */
  handleHslCalculation (color) {
    try {
      let r, g, b

      if (!color) return

      if (color.startsWith('#')) {
        const colorLen = color.length

        if (colorLen === 7 || colorLen === 9) {
          r = parseInt(color.substr(1, 2), 16)
          g = parseInt(color.substr(3, 2), 16)
          b = parseInt(color.substr(5, 2), 16)
        } else if (colorLen === 4 || colorLen === 5) {
          r = parseInt(color.substr(1, 1), 16)
          g = parseInt(color.substr(2, 2), 16)
          b = parseInt(color.substr(3, 3), 16)
        }
      } else if (color.startsWith('rgb')) {
        const colorRgb = color.match(/\d+/g)
        r = colorRgb[0]
        g = colorRgb[1]
        b = colorRgb[2]
      } else if (color.startsWith('hsl')) {
        const colorHsl = color.match(/\d+/g)
        const h = parseInt(colorHsl[0])
        const s = parseInt(colorHsl[1])
        const l = parseInt(colorHsl[2])

        if (isNaN(h + s + l)) {
          this.props.onHslChange(color, true)
          return
        }

        this.setState({
          h: h,
          s: s,
          l: l
        })
        return
      } else return

      if (isNaN(r + g + b)) {
        this.props.onHslChange(color, true)
        return
      }

      const hslValue = convertRgbToHsl(r, g, b)

      this.setState({
        h: hslValue[0],
        s: hslValue[1],
        l: hslValue[2]
      })
    } catch (e) {
      this.props.onHslChange(color, true)
    }
  }

  /**
   * Render HSL container
   * @returns {React.Element}
   */
  render () {
    const { className } = this.props
    const { h, s, l } = this.state
    const hslClsName = buildClassName(moduleName, className)
    const hslItemClsName = buildClassName(`${moduleName}-item`, className)
    const hslItemHueClsName = buildClassName(`${moduleName}-item`, className, ['hue'])
    const hslItemHueSpectrumClsName = buildClassName(`${moduleName}-item-spectrum`, className)
    const hslItemLabelHueClsName = buildClassName(`${moduleName}-item-label`, className, ['hue'])
    const hslItemLabelSaturationClsName = buildClassName(`${moduleName}-item-label`, className, ['saturation'])
    const hslItemLabelLightnessClsName = buildClassName(`${moduleName}-item-label`, className, ['lightness'])

    return (
      <div className={hslClsName}>
        <div className={hslItemHueClsName}>
          <label htmlFor={hslItemLabelHueClsName}>
          Hue
          </label>
          <div className={hslItemHueSpectrumClsName} />
          <Slider
            max={360}
            id={hslItemLabelHueClsName}
            value={h}
            onChange={value => this.handleChangeHsl(value, s, l)}
            onMouseDown={() => this.handleMouseDown()}
            onMouseUp={() => this.handleMouseUp()}
          />
        </div>

        <div className={hslItemClsName}>
          <label htmlFor={hslItemLabelSaturationClsName}>
          Saturation (%)
          </label>
          <Slider
            id={hslItemLabelSaturationClsName}
            value={s}
            onChange={value => this.handleChangeHsl(h, value, l)}
            onMouseDown={() => this.handleMouseDown()}
            onMouseUp={() => this.handleMouseUp()}
          />
        </div>

        <div className={hslItemClsName}>
          <label htmlFor={hslItemLabelLightnessClsName}>
            Lightness (%)
          </label>
          <Slider
            id={hslItemLabelLightnessClsName}
            value={l}
            onChange={value => this.handleChangeHsl(h, s, value)}
            onMouseDown={() => this.handleMouseDown()}
            onMouseUp={() => this.handleMouseUp()}
          />
        </div>
      </div>
    )
  }
}

Hsl.propTypes = propTypes

export default Hsl
