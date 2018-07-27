import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'
import { Slider } from '@talixo/slider'
import { Tooltip } from '@talixo/tooltip'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Alpha channel */
  alpha: PropTypes.bool,

  /** Default color */
  defaultColor: PropTypes.string,

  /** HSL manipulation tool */
  hsl: PropTypes.bool,

  /** Palette of predefined colors */
  palette: PropTypes.arrayOf(
    PropTypes.shape({
      /**  Unique id of color */
      id: PropTypes.string,

      /**  Name of color */
      name: PropTypes.string,

      /** Color in hex, rgb or rgba format */
      color: PropTypes.string
    })
  )
}

/**
 * Component which represents ColorInput.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {bool} [props.alpha]
 * @param {string} [props.defaultColor]
 * @param {bool} [props.hsl]
 * @param {array} [props.palette]
 * @returns {React.Element}
 */
class ColorInput extends React.PureComponent {
  state = {
    color: this.props.defaultColor || null,
    error: false,
    h: 0,
    s: 0,
    l: 0
  }

  /**
   * Update state when value is provided by props.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.defaultColor !== this.state.color && props.defaultColor !== undefined) {
      this.setState({ color: props.defaultColor })
    }
  }

  /**
   * Handle change of color
   * @param {string} color
   */
  handleChangeColor (color) {
    this.setState({
      color: color,
      error: false
    })
  }

  /**
   * Handle change of alpha channel
   * @param {number} value
   */
  handleChangeAlpha (value) {
    const color = this.state.color

    if (!color) return

    if (color.startsWith('#')) {
      this.setState({
        color: color.length > 5 ? this.convertAlphaToLongHex(value) : this.convertAlphaToShortHex(value)
      })
    } else if (color.startsWith('rgb')) {
      this.setState({
        color: this.convertAlphaToRgba(value)
      })
    } else {
      this.setState({
        error: true
      })
    }
  }

  /**
   * Convert alpha channel to rgba format
   * @param {number} value
   * @returns {string}
   */
  convertAlphaToRgba (value) {
    const { color } = this.state

    if (color.startsWith('rgb(')) {
      const decimal = (value * 100 / 25500).toFixed(2)
      const part = color.split(')')
      const newColorRgb = `${part[0]},${decimal})`

      return newColorRgb.replace('rgb', 'rgba')
    }

    if (color.startsWith('rgba(')) {
      const decimal = (value * 100 / 25500).toFixed(2)
      const part = color.split(',')

      return `${part[0]},${part[1]},${part[2]}, ${decimal})`
    }
  }

  /**
   * Convert alpha channel to long hex
   * @param {number} value
   * @returns {string}
   */
  convertAlphaToLongHex (value) {
    const alphaToHex = value.toString(16) === '0' ? '00' : value.toString(16)
    const color = this.state.color.substr(0, 7) + alphaToHex

    return color
  }

  /**
   * Convert alpha channel to short hex
   * @param {number} value
   * @returns {string}
   */
  convertAlphaToShortHex (value) {
    const alphaToHex = value.toString(16)
    const newAlpha = alphaToHex.length < 2 ? 0 : alphaToHex.substr(0, 1)
    const color = this.state.color.substr(0, 4) + newAlpha

    return color
  }

  /**
   * Handle select color
   * @param {string} color
   */
  handleSelectColor (color) {
    this.setState({
      color: color
    })
  }

  /**
   * Render alpha channel container
   * @returns {React.Element}
   */
  renderAplhaContainer () {
    return (
      <Slider
        onChange={value => this.handleChangeAlpha(value)}
        max={255}
        defaultValue={255}
      />
    )
  }

  /**
   * Render palette container
   * @returns {React.Element}
   */
  renderPalette () {
    const { className } = this.props
    const paletteClsName = buildClassName('color-input__palette', className)
    const paletteItemClsName = buildClassName('color-input__palette-item', className)
    const paletteItemTextClsName = buildClassName('color-input__palette-item-text', className)
    const paletteItemColorClsName = buildClassName('color-input__palette-item-color', className)

    const colorPalette = this.props.palette.map(el =>
      <div
        className={paletteItemClsName}
        onClick={() => this.handleSelectColor(el.color)}
        key={el.id}>
        <span className={paletteItemTextClsName}>{el.name}</span>
        <span className={paletteItemColorClsName} style={{backgroundColor: el.color}} />
      </div>
    )

    return <div className={paletteClsName}>{colorPalette}</div>
  }

  /**
   * Handle HSL button click
   */
  handleHslBtnClick () {
    try {
      const { color } = this.state
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
        this.setState({
          error: true
        })
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
      this.setState({
        error: true
      })
    }
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

    const { color } = this.state

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
    let m = l - c / 2
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
      this.setState({
        color: `#${hex}`
      })
    } else if (color.startsWith('rgb')) {
      this.setState({
        color: `rgb(${r},${g},${b})`
      })
    } else {
      this.setState({
        error: true
      })
    }
  }

  /**
   * Render palette container
   * @returns {React.Element}
   */
  renderHslManipulation () {
    const { className } = this.props
    const { h, s, l } = this.state
    const hslClsName = buildClassName('color-input__hsl', className)
    const hslItemClsName = buildClassName('color-input__hsl-item', className)
    const hslItemHueClsName = buildClassName('color-input__hsl-item', className, ['hue'])
    const hslItemHueSpectrumClsName = buildClassName('color-input__hsl-item-spectrum', className)
    const hslItemLabelHueClsName = buildClassName('color-input__hsl-item-label', className, ['hue'])
    const hslItemLabelSaturationClsName = buildClassName('color-input__hsl-item-label', className, ['saturation'])
    const hslItemLabelLightnessClsName = buildClassName('color-input__hsl-item-label', className, ['lightness'])

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
            onChange={value => this.handleChangeHsl(value, s, l)} />
        </div>

        <div className={hslItemClsName}>
          <label htmlFor={hslItemLabelSaturationClsName}>
          Saturation (%)
          </label>
          <Slider
            id={hslItemLabelSaturationClsName}
            value={s}
            onChange={value => this.handleChangeHsl(h, value, l)}
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
          />
        </div>
      </div>
    )
  }

  /**
   * Render ColorInput component.
   *
   * @returns {React.Element}
   */
  render () {
    const { alpha, className, defaultColor, hsl, palette, ...passedProps } = this.props
    const { color, error } = this.state

    const clsName = buildClassName('color-input', className)
    const displayClsName = buildClassName('color-input__display', className)
    const displayBgClsName = buildClassName('color-input__display--background', className)
    const textInputColorClsName = buildClassName('color-input__text-input', className)
    const pickerClsName = buildClassName('color-input__picker', className)
    const alphaBtnClsName = buildClassName('color-input__alpha-button', className)
    const paletteBtnClsName = buildClassName('color-input__palette-button', className)
    const hslBtnClsName = buildClassName('color-input__hsl-button', className)

    return (
      <div className={clsName}>

        <div className={displayBgClsName}>
          <div className={displayClsName}
            style={{
              background: color
            }} />
        </div>

        <TextInput
          className={textInputColorClsName} {...passedProps}
          placeholder='e.g. #ffffff'
          value={color}
          error={error}
          onChange={e => this.handleChangeColor(e)}
        />
        <input
          className={pickerClsName}
          type='color'
          value={color && color.length === 7 ? color : '#ffffff'}
          onChange={e => this.handleChangeColor(e.target.value)}
        />

        {alpha && <Tooltip
          position='top'
          triggerOn='click'
          arrow={false}
          render={() => this.renderAplhaContainer()}
        >
          <span className={alphaBtnClsName}>
            Alpha
          </span>
        </Tooltip>}

        {palette && <Tooltip
          position='bottom'
          triggerOn='click'
          arrow={false}
          render={() => this.renderPalette()}
        >
          <span className={paletteBtnClsName}>
            Palette
          </span>
        </Tooltip>}

        {hsl && <Tooltip
          position='right'
          triggerOn='click'
          arrow={false}
          render={() => this.renderHslManipulation()}
        >
          <span className={hslBtnClsName} onClick={() => this.handleHslBtnClick()}>
            HSL
          </span>
        </Tooltip>}
      </div>
    )
  }
}

ColorInput.propTypes = propTypes

export default ColorInput
