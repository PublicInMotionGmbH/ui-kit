import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Slider } from '@talixo/slider'

import convertShortHexToLong from '../utils/convertShortHexToLong'
import convertHexToRgb from '../utils/convertHexToRgb'
import convertRgbToHex from '../utils/convertRgbToHex'

const moduleName = 'color-input__alpha'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Currently selected color */
  color: PropTypes.string,

  /** Send color back to parent component */
  onAlphaChange: PropTypes.func,

  /** Output format */
  outputFormat: PropTypes.oneOf(['hex', 'rgb', 'hsl'])
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
    const decimals = (value * 100 / 25500).toFixed(2)

    if (color.startsWith('rgb(')) {
      const partValue = color.split(')')
      const newColorRgb = `${partValue[0]}, ${decimals})`

      return newColorRgb.replace('rgb', 'rgba')
    } else if (color.startsWith('rgba(')) {
      const partValue = color.split(',')

      return `${partValue[0]},${partValue[1]},${partValue[2]}, ${decimals})`
    }
  }

  /**
   * Convert alpha channel to long hex
   * @param {number} value
   * @returns {string}
   */
  const convertAlphaToHex = (value, passedColor) => {
    const alphaToHex = value.toString(16) === '0' ? '00' : value.toString(16)
    const newColor = passedColor ? passedColor.substr(0, 7) + alphaToHex : props.color.substr(0, 7) + alphaToHex

    return newColor
  }

  /**
   * Convert alpha channel to hsl
   * @param {number} value
   * @returns {string}
   */
  const convertAlphaToHsl = (value) => {
    const { color } = props
    const decimals = (value * 100 / 25500).toFixed(2)

    if (color.startsWith('hsl(')) {
      const partValue = color.split(')')
      const newColor = `${partValue[0]}, ${decimals})`
      return newColor.replace('hsl', 'hsla')
    } else if (color.startsWith('hsla(')) {
      const partValue = color.split(',')

      return `${partValue[0]},${partValue[1]},${partValue[2]}, ${decimals})`
    }
  }

  /**
   * Update hsl with alpha
   * @param {number} value
   */
  const updateHslAlpha = (value) => {
    const { color } = props
    const colorValue = color.split('(')

    if (!colorValue[1]) {
      props.onAlphaChange(color, true)
      return
    }
    const colorValuePure = colorValue[1].split(')')
    const colorValueSplited = colorValuePure[0].split(',')

    const testHValue = colorValueSplited[0] >= 0 && colorValueSplited[0] <= 360

    const testSLValues = [colorValueSplited[1], colorValueSplited[2]].every((value) => {
      value.slice(-1)
      const intValue = parseInt(value)
      return intValue >= 0 && intValue <= 100
    })

    if (!testSLValues || !testHValue) {
      props.onAlphaChange(color, true)
      return
    }

    const newColor = convertAlphaToHsl(value)
    props.onAlphaChange(newColor)
  }

  /**
   * Update hex with alpha
   * @param {number} value
   */
  const updateHexAlpha = (value) => {
    const { color } = props
    const colorValue = color.substring(1)
    const testHex = /^[a-fA-f0-9]+$/.test(colorValue)

    if (!testHex) {
      props.onAlphaChange(color, true)
      return
    }

    if (color.length > 6) {
      props.onAlphaChange(convertAlphaToHex(value))
    } else {
      const longHex = convertShortHexToLong(color)
      props.onAlphaChange(convertAlphaToHex(value, longHex))
    }
  }

  /**
   * Update rgb with alpha
   * @param {number} value
   */
  const updateRgbAlpha = (value) => {
    const { color } = props
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
  }

  /**
   * Handle change of alpha channel
   * @param {number} value
   */
  const handleChangeValue = (value) => {
    const { color, outputFormat } = props

    if (color) {
      if (color.startsWith('#') && (!outputFormat || outputFormat === 'hex')) {
        updateHexAlpha(value)
      } else if (color.startsWith('rgb') && (!outputFormat || outputFormat === 'rgb')) {
        updateRgbAlpha(value)
      } else if (color.startsWith('hsl') && (!outputFormat || outputFormat === 'hsl')) {
        updateHslAlpha(value)
      } else if (color.startsWith('#') && outputFormat === 'rgb') {
        props.onAlphaChange(convertHexToRgb(color))
      } else if (color.startsWith('rgb') && outputFormat === 'hex') {
        props.onAlphaChange(convertRgbToHex(color))
      } else if (color.startsWith('hsl') && outputFormat === 'rgb') {
        // updateHslAlpha(value)
      } else {
        props.onAlphaChange(color, true)
      }
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
