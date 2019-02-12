import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

import { mutuallyExclusiveOfType } from './propTypes/mutuallyExclusiveProps'

import AvatarChildRenderer from './AvatarChildRenderer'

const propTypes = {
  /** Alt attribute for the rendered `img` element. */
  alt: PropTypes.string,

  /** Additional class name. */
  className: PropTypes.string,

  /** Text displayed inside avatar. */
  children: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet'),

  /** Default icon displayed inside avatar. */
  defaultIcon: mutuallyExclusiveOfType(PropTypes.string, false, 'defaultText', 'defaultIcon'),

  /** Default text displayed inside avatar. */
  defaultText: mutuallyExclusiveOfType(PropTypes.string, false, 'defaultText', 'defaultIcon'),

  /** Icon displayed inside avatar. */
  icon: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet'),

  /** Additional props passed to rendered `img` element. */
  imgProps: PropTypes.object,

  /** Format avatar's children. */
  render: PropTypes.func,

  /** Controls whether avatar is circular or square. */
  rounded: PropTypes.bool,

  /** Size of the avatar in pixels. */
  size: PropTypes.number,

  /** Image displayed inside avatar. */
  src: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet'),

  /** Image set displayed inside avatar. */
  srcSet: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet'),

  /** Style passed to wrapper. */
  style: PropTypes.object
}

const defaultProps = {
  render: AvatarChildRenderer,
  rounded: false,
  size: 40
}

/**
 * Build child props.
 *
 * @param {object} props
 * @param {array} childProps
 * @returns {object}
 */
const buildChildProps = (props, childProps) => {
  let builtProps = {}
  childProps.forEach((prop, i) => {
    if (props[prop]) {
      builtProps[childProps[i]] = props[prop]
    }
  })
  return builtProps
}

/**
 * Component which represents Avatar.
 *
 * @param {object} props
 * @param {string} [props.alt]
 * @param {string} [props.className]
 * @param {string} [props.children]
 * @param {string} [props.defaultIcon]
 * @param {string} [props.defaultText]
 * @param {string} [props.icon]
 * @param {object} [props.imgProps]
 * @param {function} [props.render]
 * @param {boolean} [props.rounded]
 * @param {number} [props.size]
 * @param {string} [props.src]
 * @param {string} [props.srcSet]
 * @param {object} [props.style]
 *
 * @returns {React.Element}
 */
function Avatar (props) {
  const { alt, children, className, defaultText, defaultIcon, icon, imgProps,
    render: Renderer, rounded, size, src, srcSet, style, ...passedProps } = props

  // Build style for wrapper.
  const wrapperStyle = {
    fontSize: size,
    ...style
  }

  const childProps = buildChildProps(props, ['alt', 'children', 'defaultText', 'defaultIcon', 'icon', 'imgProps', 'src', 'srcSet'])

  // Build avatar component
  return (
    <div
      className={buildClassName('avatar', className, { rounded })}
      style={wrapperStyle}
      {...passedProps}
    >
      <Renderer {...childProps} />
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
