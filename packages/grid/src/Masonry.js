import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import Segment from './Segment'

// As it may be used too often, class names in Grid are simplified
const name = 'masonry'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children inside a Masonry - probably some Groups */
  children: PropTypes.node,

  /** Look at Segment */
  size: PropTypes.number,

  /** Look at Segment */
  medium: PropTypes.number,

  /** Look at Segment */
  large: PropTypes.number,

  /** Look at Segment */
  xlarge: PropTypes.number
}

/**
 * Component which represents Grid.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Masonry (props) {
  const { className, spaced, children, ...passedProps } = props
  const clsName = cls(name, className, {
    [`${name}--spaced`]: spaced
  })

  return (
    <Segment className={clsName} {...passedProps}>
      {children}
    </Segment>
  )
}

Masonry.propTypes = propTypes

export default Masonry
