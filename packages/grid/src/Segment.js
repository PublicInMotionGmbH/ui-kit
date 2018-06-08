import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

// As it may be used too often, class names in Grid are simplified
const name = '_'

/**
 * Component which represents Grid.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Segment (props) {
  const { className, size, medium, large, xlarge, children, ...passedProps } = props

  const clsName = cls(name, className, {
    [`${name}-${size}`]: size,
    [`${name}-md-${medium}`]: medium,
    [`${name}-lg-${large}`]: large,
    [`${name}-xl-${xlarge}`]: xlarge
  })

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

Segment.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Default number of columns (from small screen) */
  size: PropTypes.number,

  /** Number of columns from medium screen */
  medium: PropTypes.number,

  /** Number of columns from large screen */
  large: PropTypes.number,

  /** Number of columns from extra-large screen */
  xlarge: PropTypes.number,

  /** Children inside a segment */
  children: PropTypes.node
}

export default Segment
