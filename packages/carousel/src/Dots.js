import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'carousel-dots'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Grouped slides to show */
  slides: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),

  /** Number of slides visible in one time */
  perPage: PropTypes.number,

  /** Function to navigate between slides via dots */
  onChange: PropTypes.func
}

const defaultProps = {
  slides: [],
  perPage: 1
}

/**
 * Component which represents Carousel.
 *
 * @param {object} props
 * @param {Array<Array<React.Element|string>>} [props.slides]
 * @param {string} [props.className]
 * @param {number} [props.perPage]
 * @param {number} [props.value]
 * @param {func} [props.onChange]
 * @returns {React.Element}
 */
function Dots (props) {
  const { slides, onChange, value } = props

  const clsName = buildClassName([ moduleName, 'dot' ])
  const activeClsName = buildClassName([ moduleName, 'dot' ], null, [ 'active' ])
  const elements = []

  for (let i = 0; i < slides.length; i++) {
    elements.push(
      <div
        key={i}
        className={i === value ? activeClsName : clsName}
        onClick={() => onChange(i)}
      />
    )
  }

  return (
    <div className={buildClassName(moduleName)}>
      {elements}
    </div>
  )
}

Dots.propTypes = propTypes
Dots.defaultProps = defaultProps

export default Dots
