import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { TextInput } from '@talixo/text-input'
import { Slider } from '@talixo/slider'
import { Tooltip } from '@talixo/tooltip'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string
}

const defaultProps = {
  defaultColor: /* '#e0e0e050', */ 'rgb(200,200,200)',
  defaultAlpha: 255,
  defaltPalette: []
}

/**
 * Component which represents ColorInput.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class ColorInput extends React.PureComponent {
  state = {
    color: this.props.defaultColor
  }

  // componentWillReceiveProps () {

  // }

  handleChangeColor (color) {
    this.setState({color: color})
  }

  handleChangeAlpha (value) {
    const color = this.state.color

    if (color.startsWith('#')) {
      this.setState({
        color: color.length > 5 ? this.convertAlphaToLongHex(value) : this.convertAlphaToShortHex(value)
      })
    } else if (color.startsWith('rgb')) {
      this.setState({
        color: this.convertAlphaToRgba(value)
      })
    }
  }

  convertAlphaToRgba (value) {
    const color = this.state.color

    if (color.startsWith('rgb(')) {
      const decimal = (value * 100 / 25500).toFixed(2)
      const part = color.split(')')
      const newColorRgb = `${part[0]},${decimal})`

      return newColorRgb.replace('rgb', 'rgba')
    }

    if (color.startsWith('rgba(')) {
      const decimal = (value * 100 / 25500).toFixed(2)
      const part = color.split(',')

      return `${part[0]},${part[1]},${part[2]},${decimal})`
    }
  }

  convertAlphaToLongHex (value) {
    const alphaToHex = value.toString(16) === '0' ? '00' : value.toString(16)
    const color = this.state.color.substr(0, 7) + alphaToHex

    return color
  }

  convertAlphaToShortHex (value) {
    const alphaToHex = value.toString(16)
    const newAlpha = alphaToHex.length < 2 ? 0 : alphaToHex.substr(0, 1)
    const color = this.state.color.substr(0, 4) + newAlpha

    return color
  }

  renderPalette () {

  }

  render () {
    const { className, defaultAlpha, ...passedProps } = this.props
    const { color } = this.state

    const clsName = buildClassName('color-input', className)
    const displayClsName = buildClassName('color-input__display', className)
    const displayBgClsName = buildClassName('color-input__display--background', className)
    const textInputColorClsName = buildClassName('color-input__text-input', className)
    const pickerClsName = buildClassName('color-input__picker', className)
    const alphaBtnClsName = buildClassName('color-input__alpha-button', className)
    const paletteClsName = buildClassName('color-input__palette', className)

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
          placeholder={`e.g. ${this.props.defaultColor}`}
          value={color}
          onChange={e => this.handleChangeColor(e)}
        />
        <input
          className={pickerClsName}
          type='color'
          value={color}
          onChange={e => this.handleChangeColor(e.target.value)}
        />

        <Tooltip
          position='top'
          triggerOn='click'
          arrow={false}
          render={() =>
            <Slider
              onChange={value => this.handleChangeAlpha(value)}
              min={0}
              max={255}
              defaultValue={defaultAlpha}
            />
          }
        >
          <span className={alphaBtnClsName}>
            Alpha
          </span>
        </Tooltip>

        <Tooltip
          position='right'
          triggerOn='click'
          arrow={false}
          render={() => { this.renderPalette() }}
        >
          <span className={paletteClsName}>
            Palette
          </span>
        </Tooltip>
      </div>
    )
  }
}

ColorInput.propTypes = propTypes
ColorInput.defaultProps = defaultProps

export default ColorInput
