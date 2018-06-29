import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import { mutuallyExclusiveOfType } from '../propTypes/mutuallyExclusiveProps'

const propTypes = {
  /** Alt attribute for the rendered `img` element. */
  alt: PropTypes.string,

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

  /** Image displayed inside avatar. */
  src: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet'),

  /** Image set displayed inside avatar. */
  srcSet: mutuallyExclusiveOfType(PropTypes.string, true, 'children', 'icon', 'src', 'srcSet')
}

/**
 * Component which represents Avatar.
 *
 * @property {object} props
 * @property {string} [props.alt]
 * @property {string} [props.children]
 * @property {string} [props.defaultIcon]
 * @property {string} [props.defaultText]
 * @property {string} [props.icon]
 * @property {object} [props.imgProps]
 * @property {string} [props.src]
 * @property {string} [props.srcSet]
 *
 * @property {object} [state]
 * @property {boolean} [state.imageError]
 *
 * @property {function} handleImageError
 *
 * @class
 */
class AvatarChildRenderer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageError: false
    }
    this.handleImageError = this.handleImageError.bind(this)
  }

  /**
   * Handle image error.
   *
   */
  handleImageError () {
    this.setState({ imageError: true })
  }

  /**
   * Build avatar's child.
   *
   * @returns {React.Element}
   */
  render () {
    const { alt, children, defaultText, defaultIcon, icon, imgProps, src, srcSet } = this.props
    const { imageError } = this.state

    const innerClsName = buildClassName([ 'avatar', 'inner' ])

    if (children) {
      return <span className={innerClsName}>{children}</span>
    } else if (icon) {
      return <Icon className={innerClsName} name={icon} />
    } else if (imageError && defaultIcon) {
      return <Icon className={innerClsName} name={defaultIcon} />
    } else if (imageError && defaultText) {
      return <span className={innerClsName}>{defaultText}</span>
    } else if (imageError) {
      return <span className={innerClsName}>?</span>
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
}

AvatarChildRenderer.propTypes = propTypes

export default AvatarChildRenderer
