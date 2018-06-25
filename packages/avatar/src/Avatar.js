import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { mutuallyExclusiveOfType } from '../propTypes/mutuallyExclusiveProps'

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
  rounded: false,
  size: 40
}

/**
 * Component which represents Avatar.
 *
 * @property {object} props
 * @property {string} [props.alt]
 * @property {string} [props.className]
 * @property {string} [props.children]
 * @property {string} [props.defaultIcon]
 * @property {string} [props.defaultText]
 * @property {string} [props.icon]
 * @property {object} [props.imgProps]
 * @property {boolean} [props.rounded]
 * @property {number} [props.size]
 * @property {string} [props.src]
 * @property {string} [props.srcSet]
 * @property {object} [props.style]
 *
 * @property {object} [state]
 * @property {boolean} [state.imageError]
 *
 * @property {function} buildChild
 * @property {function} handleImageError
 *
 * @class
 */
class Avatar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageError: false
    }
    this.buildChild = this.buildChild.bind(this)
    this.handleImageError = this.handleImageError.bind(this)
  }

  /**
   * Build avatar's child.
   *
   * @returns {React.Element}
   */
  buildChild () {
    const { alt, children, defaultText, defaultIcon, icon, imgProps, src, srcSet } = this.props
    const { imageError } = this.state

    if (children) {
      return children
    } else if (icon) {
      return <Icon name={icon} />
    } else if (imageError && defaultIcon) {
      return <Icon name={defaultIcon} />
    } else if (imageError && defaultText) {
      return defaultText
    } else if (imageError) {
      return '?'
    } else if (src || srcSet) {
      return (
        <img
          onError={this.handleImageError}
          src={src}
          srcSet={srcSet}
          alt={alt}
          {...imgProps}
        />
      )
    }
  }

  /**
   * Handle image error.
   *
   */
  handleImageError () {
    this.setState({ imageError: true })
  }

  /**
   * Render avatar.
   *
   * @returns {React.Element}
   */
  render () {
    const { alt, children, className, defaultText, defaultIcon, icon, imgProps,
      rounded, size, src, srcSet, style, ...passedProps } = this.props

    // Build style for wrapper.
    const wrapperStyle = {
      height: size,
      width: size,
      fontSize: size * 0.618,
      borderRadius: rounded ? '50%' : 0,
      ...style
    }

    // Build avatar component
    return (
      <div
        className={buildClassName('avatar', className)}
        style={wrapperStyle}
        {...passedProps}
      >
        {this.buildChild()}
      </div>
    )
  }
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
