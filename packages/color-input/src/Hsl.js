import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Slider } from '@talixo/slider'

const moduleName = 'color-input__hsl'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Currently selected color */
  color: PropTypes.string,

  /** Send color back to parent component */
  onHslChange: PropTypes.func
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

    const { color } = this.props

    let r, g, b
    h = parseFloat(h)
    s = parseFloat(s)
    l = parseFloat(l)

    if (h < 0) h = 0
    if (s < 0) s = 0
    if (l < 0) l = 0
    if (h >= 360) h = 359
    if (s > 100) s = 100
    if (l > 100) l = 100
    s /= 100
    l /= 100
    let c = (1 - Math.abs(2 * l - 1)) * s
    let hh = h / 60
    let x = c * (1 - Math.abs(hh % 2 - 1))
    r = g = b = 0

    if (hh >= 0 && hh < 1) {
      r = c
      g = x
    } else if (hh >= 1 && hh < 2) {
      r = x
      g = c
    } else if (hh >= 2 && hh < 3) {
      g = c
      b = x
    } else if (hh >= 3 && hh < 4) {
      g = x
      b = c
    } else if (hh >= 4 && hh < 5) {
      r = x
      b = c
    } else {
      r = c
      b = x
    }

    const m = (l - c / 2) < 0 ? 0 : l - c / 2

    r += m
    g += m
    b += m

    r *= 255
    g *= 255
    b *= 255

    r = Math.floor(r)
    g = Math.floor(g)
    b = Math.floor(b)

    let hex = r * 65536 + g * 256 + b
    hex = hex.toString(16, 6)
    let len = hex.length
    if (len < 6) {
      for (let i = 0; i < 6 - len; i++) {
        hex = '0' + hex
      }
    }
    if (!color || color.startsWith('#')) {
      this.props.onHslChange(`#${hex}`)
    } else if (color.startsWith('rgb')) {
      this.props.onHslChange(`rgb(${r},${g},${b})`)
    } else {
      this.props.onHslChange(color, true)
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
        } else return
      } else if (color.startsWith('rgb')) {
        const colorRgb = color.match(/\d+/g)
        r = colorRgb[0]
        g = colorRgb[1]
        b = colorRgb[2]
      } else return

      if (isNaN(r + g + b)) {
        this.props.onHslChange(color, true)
        return
      }

      r /= 255
      g /= 255
      b /= 255

      let max = Math.max(r, g, b)
      let min = Math.min(r, g, b)
      let h = (max + min) / 2
      let s = (max + min) / 2
      let l = (max + min) / 2

      if (max === min) {
        h = s = 0
      } else {
        let d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }

      h = Math.floor(h * 360)
      s = Math.floor(s * 100)
      l = Math.floor(l * 100)

      this.setState({
        h: h,
        s: s,
        l: l
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
