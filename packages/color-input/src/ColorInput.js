import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'
import { Tooltip } from '@talixo/tooltip'

import Alpha from './Alpha'
import Palette from './Palette'
import Hsl from './Hsl'

const moduleName = 'color-input'

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
   * Handle alpha
   * @param {string} color
   * @param {boolean} error
   */
  handleAlpha (color, error) {
    if (!color) {
      error = true
    }
    this.setState({
      color: color,
      error: error
    })
  }

  /**
   * Handle palette
   * @param {string} color
   */
  handlePalette (color) {
    this.setState({
      color: color
    })
  }

  /**
   * Handle HSL
   * @param {string} color
   * @param {boolean} error
   */
  handleHsl = (color, error) => {
    this.setState({
      color: color,
      error: error
    })
  }

  /**
   * Render ColorInput component.
   *
   * @returns {React.Element}
   */
  render () {
    const { alpha, className, defaultColor, hsl, palette, ...passedProps } = this.props
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
          render={() => <Alpha color={color} onAlphaChange={(value, error) => this.handleAlpha(value, error)} />}
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
