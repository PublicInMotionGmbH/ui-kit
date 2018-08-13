import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import Segment from './Segment'

// As it may be used too often, class names in Grid are simplified
const name = '__'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children inside a Group - probably some Segment (or Group/Masonry which are Segments too) */
  children: PropTypes.node,

  /** Should have spacing between */
  spaced: PropTypes.bool,

  /** Look at Segment */
  size: PropTypes.number,

  /** Look at Segment */
  medium: PropTypes.number,

  /** Look at Segment */
  large: PropTypes.number,

  /** Look at Segment */
  xlarge: PropTypes.number
}

const defaultProps = {
  spaced: false
}

/**
 * Component which represents Grid.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Group (props) {
  const { className, spaced, children, ...passedProps } = props
  const clsName = cls(name, className, {
    [`${name}--spaced`]: !!spaced
  })

  return (
    <Segment className={clsName} {...passedProps}>
      {children}
    </Segment>
  )
}

Group.displayName = 'Group'

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
