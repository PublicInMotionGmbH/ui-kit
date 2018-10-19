import React from 'react'
import PropTypes from 'prop-types'
import flatMap from 'lodash/flatMap'

import { buildClassName } from '@talixo/shared'

import NavigationWrapper from './NavigationWrapper'
import Element from './Element'

export const moduleName = 'navigation'

/**
 * Recursively generates Elements and wraps it into NavigationWrapper.
 *
 * @param {object} element
 * @param {string} type
 * @returns {Element|ReactElement}
 */
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

/**
 * Build Navigation Elements.
 *
 * @param {object} elements
 * @param {string} type
 * @returns {Element|reactElement}
 */
function buildElements (elements, type) {
  return elements.map((element, index) => getElements(element, type))
}

/**
 * Add divider between elements.
 *
 * @param {node[]} elements
 * @param {node} divider
 * @returns {Element[]|ReactElement[]}
 */
function addDivider (elements, divider) {
  const dividerCls = buildClassName([moduleName, 'divider'])
  const dividerElement = <div className={dividerCls}>{divider}</div>
  const elementsLastIndex = elements.length - 1

  return flatMap(elements, (element, index) => [
    element,
    index !== elementsLastIndex && dividerElement
  ])
}

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Divider element. */
  divider: PropTypes.node,

  /** Array elements which are displayed inside Navigation. Will be ommited if Navigation has any children inside. */
  elements: PropTypes.arrayOf(PropTypes.shape({
    /** Is element active? */
    active: PropTypes.bool,

    /** Element children. */
    children: PropTypes.node,

    /** Additional class name passedto element wrapper */
    className: PropTypes.string,

    /** Is action related to this element completed (e.g. iniside a step)? */
    completed: PropTypes.bool,

    /** Is elemenet disabled? */
    disabled: PropTypes.bool,

    /** Does it have ana error? */
    error: PropTypes.bool,

    /** Element identifier. It will be passed to onChange and onHover functions as a first argument. */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Element label. */
    label: PropTypes.string,

    /** onClick callback. */
    onClick: PropTypes.func,

    /** Is this element open? */
    open: PropTypes.bool,

    /** Is this element a panel? Applies only to navigation of type `sidebar` */
    panel: PropTypes.bool,

    /** Render method of each element. */
    render: PropTypes.func,

    /** Array of subelements. Any of element prop can be passed to each object. */
    subelements: PropTypes.arrayOf(PropTypes.object),

    /** Subtitle of element exapandable menu. */
    subtitle: PropTypes.string
  })),

  /** Type of navigation. Can beone of: `breadcrumbs`, `navbar`, `pagination`, `sidebar`, `steps`, `tabs`, `tree` */
  type: PropTypes.oneOf(['breadcrumbs', 'navbar', 'pagination', 'sidebar', 'steps', 'tabs', 'tree'])
}

const defaultProps = {
  elements: [],
  type: 'navbar'
}

/**
 * Component which represents Simple Navigation.
 *
 * @param {object} props
 * @param {string} props.className
 * @param {node} props.divider
 * @param {object[]} props.elements
 * @param {boolean} props.elements.active
 * @param {node} props.elements.children
 * @param {string} props.elements.className
 * @param {boolean} props.elements.completed
 * @param {boolean} props.elements.disabled
 * @param {boolean} props.elements.error
 * @param {number|string} props.elements.id
 * @param {string} props.elements.label
 * @param {function} props.elements.onClick
 * @param {boolean} props.elements.open
 * @param {boolean} props.elements.panel
 * @param {function} props.elements.render
 * @param {object[]} props.elements.subelements
 * @param {string} props.elements.subtitle
 * @param {string} props.type
 *
 * @returns {Element|ReactElement}
 */
function Navigation (props) {
  const { className, children, divider, elements, type, ...passedProps } = props
  const hasDivider = type === 'breadcrumbs' && divider != null

  const generatedElements = children == null && Array.isArray(elements)
    ? buildElements(elements, type)
    : children

  const renderElements = hasDivider
    ? addDivider(generatedElements, divider)
    : generatedElements

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
