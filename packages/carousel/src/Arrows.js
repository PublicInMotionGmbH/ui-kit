import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { Icon } from '@talixo/icon'

const moduleName = 'carousel-arrows'

const propTypes = {
  /** Handler for click on "back" arrow */
  onBack: PropTypes.func,

  /** Handler for click on "forward" arrow */
  onForward: PropTypes.func
}

/**
 * Component which represents basic arrows on carousel.
 *
 * @param {object} props
 * @param {function} [props.onBack]
 * @param {function} [props.onForward]
 * @returns {React.Element}
 */
function Arrows (props) {
  const { onBack, onForward } = props

  const clsName = buildClassName(moduleName)
  const prevArrowClsName = buildClassName([ moduleName, 'arrow' ], null, [ 'back' ])
  const nextArrowClsName = buildClassName([ moduleName, 'arrow' ], null, [ 'forward' ])

  return (
    <div className={clsName}>
      <button className={prevArrowClsName} onClick={onBack}>
        <Icon name='chevron_left' />
      </button>
      <button className={nextArrowClsName} onClick={onForward}>
        <Icon name='chevron_right' />
      </button>
    </div>
  )
}

Arrows.displayName = 'Arrows'

Arrows.propTypes = propTypes

export default Arrows
