import React from 'react'
import PropTypes from 'prop-types'
import { buildClassName } from '@talixo/shared'

import NavigationWrapper from './NavigationWrapper'
import Element from './SimpleElement'

export const moduleName = 'navigation'

function getElements (element, type) {
  const { panel, subelements, subtitle } = element

  const children = Array.isArray(subelements) && subelements.length > 0
    ? <NavigationWrapper panel={panel} type={type} subtitle={subtitle}>
      { subelements.map(subelement => getElements(subelement, type)) }
    </NavigationWrapper>
    : null

  const hasChildren = !!children

  return (
    <Element
      key={element.id}
      hasChildren={hasChildren}
      {...element}
    >
      { children }
    </Element>
  )
}

function buildDivider (divider) {
  const dividerCls = buildClassName([moduleName, 'divider'])

  return <div className={dividerCls}>{divider}</div>
}

const propTypes = {
  /**  */
  className: PropTypes.string,

  /**  */
  divider: PropTypes.node,

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
  buildElements () {
    const { divider, elements, type } = this.props
    const elementsLastIndex = elements.length - 1

    const dividerElement = type === 'breadcrumbs' && divider != null
      ? buildDivider(divider)
      : null

    const renderElements = elements.map((element, index) => [
      getElements(element, type),
      index !== elementsLastIndex && dividerElement
    ])
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
