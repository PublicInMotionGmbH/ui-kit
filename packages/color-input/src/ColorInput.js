import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'
import { Tooltip } from '@talixo/tooltip'

import Alpha from './Alpha'
import Palette from './Palette'
import Hsl from './Hsl'

import convertHexToRgb from '../utils/convertHexToRgb'
import convertRgbToHex from '../utils/convertRgbToHex'
import convertShortHexToLong from '../utils/convertShortHexToLong'
import convertHslToRgbHex from '../utils/convertHslToRgbHex'
import convertRgbToHsl from '../utils/convertRgbToHsl'

const moduleName = 'color-input'

const propTypes = {
  /** Alpha channel */
  alpha: PropTypes.bool,

  /** Additional class name */
  className: PropTypes.string,

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
  ),

  /** Output format */
  outputFormat: PropTypes.oneOf(['hex', 'rgb', 'hsl']),

  /** Value passed from outside */
  value: PropTypes.string
}

/**
 * Component which represents ColorInput.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {bool} [props.alpha]
 * @property {string} [props.defaultColor]
 * @property {bool} [props.hsl]
 * @property {array} [props.palette]
 *
 * @class {React.Element}
 */
class ColorInput extends React.PureComponent {
  state = {
    color: this.props.value || this.props.defaultColor || null,
    error: false
  }

  /**
   * Update state when value is provided by props.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.value !== this.state.color && props.value !== undefined) {
      this.setState({ color: props.value })
    }

    if (props.defaultColor !== this.state.color && props.defaultColor !== undefined) {
      this.setState({ color: props.defaultColor })
    }
  }

  convertFormat (passedColor) {
    const { outputFormat } = this.props
    const color = passedColor || this.state.color

    if (color && outputFormat === 'rgb') {
      if (color.startsWith('#')) {
        this.setState({
          color: color.length > 6
            ? convertHexToRgb(color)
            : convertHexToRgb(convertShortHexToLong(color))
        })
        return
      } else if (color.startsWith('hsl')) {
        const colorHsl = color.match(/\d+/g)
        const h = colorHsl[0]
        const s = colorHsl[1]
        const l = colorHsl[2]

        this.setState({
          color: convertHslToRgbHex(h, s, l, color, 'rgb')
        })
        return
      }
    } else if (color && outputFormat === 'hex') {
      if (color.startsWith('rgb')) {
        this.setState({
          color: convertRgbToHex(color)
        })
        return
      } else if (color.startsWith('hsl')) {
        const colorHsl = color.match(/\d+/g)
        const h = colorHsl[0]
        const s = colorHsl[1]
        const l = colorHsl[2]

        this.setState({
          color: convertHslToRgbHex(h, s, l, color, 'hex')
        })
        return
      }
    } else if (color && outputFormat === 'hsl') {
      if (color.startsWith('#')) {
        let longHex = color
        if (color.length < 5) {
          longHex = convertShortHexToLong(color)
        }
        const r = parseInt(longHex.substring(1, 3), 16)
        const g = parseInt(longHex.substring(3, 5), 16)
        const b = parseInt(longHex.substring(5, 7), 16)

        const hslValue = convertRgbToHsl(r, g, b)
        const newColor = `hsl(${hslValue[0]},${hslValue[1]}%,${hslValue[2]}%)`
        this.setState({
          color: newColor
        })
        return
      } else if (color.startsWith('rgb')) {
        const colorRgb = color.match(/\d+/g)
        const r = colorRgb[0]
        const g = colorRgb[1]
        const b = colorRgb[2]
        const hslValue = convertRgbToHsl(r, g, b)
        const newColor = `hsl(${hslValue[0]},${hslValue[1]}%,${hslValue[2]}%)`
        this.setState({
          color: newColor
        })
        return
      }
    }
    this.setState({
      color: color
    })
  }

  /**
   * Handle change of color
   * @param {string} color
   */
  handleChangeColor (color) {
    const { onChange } = this.props
    this.setState({
      color: color,
      error: false
    })

    if (onChange) {
      onChange(color)
    }
  }

  /**
   * Handle alpha
   * @param {string} color
   * @param {boolean} error
   */
  handleAlpha (color, error) {
    const { onChange } = this.props

    if (!color) {
      error = true
    }
    this.setState({
      color: color,
      error: error
    })

    if (onChange) {
      onChange(color)
    }
  }

  /**
   * Handle palette
   * @param {string} color
   */
  handlePalette (color) {
    const { onChange } = this.props

    this.convertFormat(color)

    if (onChange) {
      onChange(color)
    }
  }

  /**
   * Handle HSL
   * @param {string} color
   * @param {boolean} error
   */
  handleHsl = (color, error) => {
    const { onChange } = this.props

    this.setState({
      color: color,
      error: error
    })

    if (onChange) {
      onChange(color)
    }
  }

  /**
   * Render ColorInput component.
   *
   * @returns {React.Element}
   */
  render () {
    const { alpha, className, defaultColor, hsl, palette, outputFormat, ...passedProps } = this.props
    const { color, error } = this.state

    const clsName = buildClassName(moduleName, className)
    const displayClsName = buildClassName(`${moduleName}__display`, className)
    const displayBgClsName = buildClassName(`${moduleName}__display--background`, className)
    const textInputColorClsName = buildClassName(`${moduleName}__text-input`, className)
    const pickerClsName = buildClassName(`${moduleName}__picker`, className)
    const alphaBtnClsName = buildClassName(`${moduleName}__alpha-button`, className)
    const paletteBtnClsName = buildClassName(`${moduleName}__palette-button`, className)
    const hslBtnClsName = buildClassName(`${moduleName}__hsl-button`, className)

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
          onBlur={() => this.convertFormat()}
        />
        <input
          className={pickerClsName}
          type='color'
          value={color && color.length === 7 ? color : '#ffffff'}
          onChange={e => this.handleChangeColor(e.target.value)}
          onFocus={() => this.convertFormat()}
        />

        {alpha && <Tooltip
          position='top'
          triggerOn='click'
          arrow={false}
          render={() =>
            <Alpha
              color={color}
              onAlphaChange={(value, error) => this.handleAlpha(value, error)}
              outputFormat={outputFormat}
            />}
        >
          <span className={alphaBtnClsName}>
            Alpha
          </span>
        </Tooltip>}

        {palette && <Tooltip
          position='bottom'
          triggerOn='click'
          arrow={false}
          render={() => <Palette palette={palette} onPaletteChange={(value) => this.handlePalette(value)} />}
        >
          <span className={paletteBtnClsName}>
            Palette
          </span>
        </Tooltip>}

        {
          hsl &&
          <Tooltip
            position='right'
            triggerOn='click'
            arrow={false}
            render={() =>
              <Hsl
                color={color}
                onHslChange={this.handleHsl}
                outputFormat={outputFormat}
                ref={instance => { this.child = instance }}
              />}
          >
            <span className={hslBtnClsName} >
            HSL
            </span>
          </Tooltip>
        }
      </div>
    )
  }
}

ColorInput.propTypes = propTypes

export default ColorInput
