import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Slider } from '@talixo/slider'

const moduleName = 'color-input__alpha'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Currently selected color */
  color: PropTypes.string,

  /** Send color back to parent component */
  onAlphaChange: PropTypes.func
}

/**
* Component which represents Alpha.
*
* @param {object} props
* @param {string} [props.color]
* @returns {React.Element}
*/
function Alpha (props) {
  const { className } = props
  const alphaClsName = buildClassName(moduleName, className)

  /**
   * Convert alpha channel to rgba format
   * @param {number} value
   * @returns {string}
   */
  const convertAlphaToRgba = (value) => {
    const { color } = props

    if (color.startsWith('rgb(')) {
      const decimals = (value * 100 / 25500).toFixed(2)
      const partValue = color.split(')')
      const newColorRgb = `${partValue[0]}, ${decimals})`

      return newColorRgb.replace('rgb', 'rgba')
    } else if (color.startsWith('rgba(')) {
      const decimals = (value * 100 / 25500).toFixed(2)
      const partValue = color.split(',')

      return `${partValue[0]},${partValue[1]},${partValue[2]}, ${decimals})`
    }
  }

  /**
   * Convert alpha channel to long hex
   * @param {number} value
   * @returns {string}
   */
  const convertAlphaToLongHex = (value) => {
    const alphaToHex = value.toString(16) === '0' ? '00' : value.toString(16)
    const color = props.color.substr(0, 7) + alphaToHex

    return color
  }

  /**
   * Convert alpha channel to short hex
   * @param {number} value
   * @returns {string}
   */
  const convertAlphaToShortHex = (value) => {
    const alphaToHex = value.toString(16)
    const newAlpha = alphaToHex.length < 2 ? 0 : alphaToHex.substr(0, 1)
    const color = props.color.substr(0, 4) + newAlpha

    return color
  }

  /**
   * Handle change of alpha channel
   * @param {number} value
   */
  const handleChangeValue = (value) => {
    const { color } = props

    if (!color) {
      props.onAlphaChange(color, true)
      return
    }

    if (color.startsWith('#')) {
      const colorValue = color.substring(1)
      const testHex = /^[a-fA-f0-9]+$/.test(colorValue)

      if (!testHex) {
        props.onAlphaChange(color, true)
        return
      }

      const newColor = color.length > 5 ? convertAlphaToLongHex(value) : convertAlphaToShortHex(value)
      props.onAlphaChange(newColor)
    } else if (color.startsWith('rgb')) {
      const colorValue = color.split('(')
      if (!colorValue[1]) {
        props.onAlphaChange(color, true)
        return
      }
      const colorValuePure = colorValue[1].split(')')
      const colorValueSplited = colorValuePure[0].split(',')
      const testRgb = colorValueSplited.every((value) => {
        return value >= 0 && value <= 255
      })
      if (!testRgb) {
        props.onAlphaChange(color, true)
        return
      }

      const newColor = convertAlphaToRgba(value)
      props.onAlphaChange(newColor)
    } else {
      props.onAlphaChange(color, true)
    }
  }

  return (
    <span className={alphaClsName}>
      <Slider
        onChange={value => handleChangeValue(value)}
        max={255}
        defaultValue={255}
      />
    </span>
  )
}

Alpha.propTypes = propTypes

export default Alpha
