import React from 'react'
import PropTypes from 'prop-types'
import { buildClassName } from '@talixo/shared'

import NavigationWrapper from './NavigationWrapper'
import Element from './SimpleElement'

export const moduleName = 'navigation'

function clickHandler (element, e) {
  const { id, onClick } = element
  if (onClick) {
    onClick(id, e)
  }
}
function onMouseOverHandler (element, e) {
  const { id, onMouseOver } = element
  if (onMouseOver) {
    onMouseOver(id, e)
  }
}

function getElements (element, type) {
  const { subelements } = element

  const children = Array.isArray(subelements) && subelements.length > 0
    ? <NavigationWrapper type={type}>
      { subelements.map(subelement => getElements(subelement, type)) }
    </NavigationWrapper>
    : null

  const hasChildren = !!children

  return (
    <Element
      key={element.id}
      hasChildren={hasChildren}
      {...element}
      onClick={(e) => clickHandler(element, e)}
      onMouseOver={(e) => onMouseOverHandler(element, e)}
    >
      { children }
    </Element>
  )
}

const propTypes = {
  /**  */
  className: PropTypes.string,

  /**  */
  divider: PropTypes.any,

  /**  */
  elements: PropTypes.arrayOf(PropTypes.shape({
    /**  */
    active: PropTypes.bool,

    /**  */
    disabled: PropTypes.bool,

    /**  */
    id: PropTypes.number,

    /**  */
    name: PropTypes.string,

    /**  */
    subelements: PropTypes.array,

    /**  */
    onClick: PropTypes.func,

    /**  */
    onHover: PropTypes.func,

    /**  */
    render: PropTypes.func
  })),

  /**  */
  type: PropTypes.oneOf(['breadcrumbs', 'navbar', 'pagination', 'sidebar', 'steps', 'tabs', 'tree'])
}

const defaultProps = {
  elements: [],
  type: 'navbar'
}

/**
 * Component which represents Simple Navigation.
 *
 */
class Navigation extends React.Component {
  buildElements = () => {
    const { elements, type } = this.props
    const renderElements = elements.map(element => getElements(element, type))
    return renderElements
  }

  render () {
    const { className, divider, elements, type, ...passedProps } = this.props

    const wrapperCls = buildClassName([`${moduleName}-parent`])

    return (
      <NavigationWrapper className={wrapperCls} type={type} {...passedProps}>
        { this.buildElements() }
      </NavigationWrapper>
    )
  }
}

Navigation.displayName = 'Navigation'

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default Navigation
