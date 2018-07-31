import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'color-input__palette'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

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

  /** Send color back to parent component */
  onPaletteChange: PropTypes.func
}

/**
* Component which represents Palette.
*
* @param {object} props
* @param {string} [props.color]
* @returns {React.Element}
*/
function Palette (props) {
  const { className } = props
  const paletteClsName = buildClassName(moduleName, className)
  const paletteItemClsName = buildClassName(`${moduleName}-item`, className)
  const paletteItemTextClsName = buildClassName(`${moduleName}-item-text`, className)
  const paletteItemColorClsName = buildClassName(`${moduleName}-item-color`, className)

  const colorPalette = props.palette.map(el =>
    <div
      className={paletteItemClsName}
      onClick={() => handleSelectColor(el.color)}
      key={el.id}>
      <span className={paletteItemTextClsName}>{el.name}</span>
      <span className={paletteItemColorClsName} style={{backgroundColor: el.color}} />
    </div>
  )

  /**
   * Handle select color
   * @param {string} color
   */
  const handleSelectColor = (color) => {
    props.onPaletteChange(color)
  }

  return <div className={paletteClsName}>{colorPalette}</div>
}

Palette.propTypes = propTypes

export default Palette
