import React from 'react'
import PropTypes from 'prop-types'
import flatMap from 'lodash/flatMap'

import { buildClassName } from '@talixo/shared'

import NavigationWrapper from './NavigationWrapper'
import Element from './Element'

export const moduleName = 'navigation'

function getElements (element, type) {
  const { panel, subelements, subtitle } = element

  const subelement = Array.isArray(subelements) && subelements.length > 0
    ? <NavigationWrapper panel={panel} type={type} subtitle={subtitle}>
      { subelements.map(subelement => getElements(subelement, type)) }
    </NavigationWrapper>
    : null

  return (
    <Element
      {...element}
      key={element.id}
      subelement={subelement}
      type={type}
    />
  )
}

function buildDivider (divider) {
  const dividerCls = buildClassName([moduleName, 'divider'])

  return <div className={dividerCls}>{divider}</div>
}

function buildElements (elements, type) {
  return elements.map((element, index) => getElements(element, type))
}

function addDivider (elements, divider) {
  const elementsLastIndex = elements.length - 1
  const dividerElement = buildDivider(divider)

  return flatMap(elements, (element, index) => [
    element,
    index !== elementsLastIndex && dividerElement
  ])
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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
function Navigation (props) {
  const { className, children, divider, elements, type, ...passedProps } = props

  const hasDivider = type === 'breadcrumbs' && divider != null
  const generatedElements = children == null ? buildElements(elements, type) : children
  const renderElements = hasDivider ? addDivider(generatedElements, divider) : generatedElements

  return (
    <NavigationWrapper parent type={type} {...passedProps}>
      { renderElements }
    </NavigationWrapper>
  )
}

Navigation.displayName = 'Navigation'

Navigation.propTypes = propTypes

Navigation.defaultProps = defaultProps

export default Navigation
