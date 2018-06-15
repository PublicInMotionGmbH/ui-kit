import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

const moduleName = 'carousel-dots'

/**
 * Component which represents Carousel.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Dots (props) {
  const { children, perPage, onChange } = props
  const dotsNumber = Math.ceil(children.length / perPage)

  let elements = []
  for (let i = 0; i < dotsNumber; i++) {
    elements.push(<div key={i} className={buildClassName([moduleName, 'single'])} onClick={() => onChange(i)} />)
  }
  return (
    <div className={buildClassName(moduleName)}> {elements} </div>
  )
}

Dots.propTypes = {
  /** Additional class name */
  className: PropTypes.string

}

export default Dots
