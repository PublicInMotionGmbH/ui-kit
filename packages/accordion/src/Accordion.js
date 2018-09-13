import React from 'react'
import PropTypes from 'prop-types'

import { prefix, buildClassName } from '@talixo/shared'

import { Collapse } from '@talixo/collapse'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Should it collapse smoothly? */
  smooth: PropTypes.bool,

  /** Animation time (in ms), requires Collapse geometry CSS */
  animationSpeed: PropTypes.number,

  /** Options to show in accordion */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** Label to show in single option */
    label: PropTypes.node.isRequired,

    /** Content to show inside */
    content: PropTypes.node.isRequired
  })).isRequired,

  /** IDs of currently opened element */
  value: PropTypes.any,

  /** Event fired when button is clicked */
  onChange: PropTypes.func,

  /** Render "open" icon for closed tab */
  renderOpenIcon: PropTypes.func,

  /** Render "close" icon for opened tab */
  renderCloseIcon: PropTypes.func,

  /** Function to build unique ID per option */
  buildId: PropTypes.func,

  /** Should allow opening many sections? */
  multi: PropTypes.bool
}

const defaultProps = {
  animationSpeed: 200,
  smooth: true,
  multi: false,
  buildId: (option, index) => index
}

/**
 * Build element to show in accordion
 *
 * @param {object} props
 * @param {function} props.onOpen
 * @param {function} props.onClose
 * @param {function} props.buildId
 * @param {function} [props.renderOpenIcon]
 * @param {function} [props.renderCloseIcon]
 * @param {array} [props.value]
 * @param {boolean} props.smooth
 * @param {number|null} props.animationSpeed
 * @param {object|{ label: *, content: * }} option
 * @param {number} index
 * @returns {*}
 */
function buildElement (props, option, index) {
  const {
    buildId, onOpen, onClose, value, smooth, animationSpeed,
    renderOpenIcon, renderCloseIcon
  } = props

  // Build ID based on the option
  const id = buildId(option, index)

  // Check if current block is collapsed
  const collapsed = value.indexOf(id) === -1

  // Build onClick handler
  const change = () => collapsed ? onOpen(id) : onClose(id)

  // Build class name for element
  const className = buildClassName('accordion-element', null, { collapsed })

  // Build props for elements
  const buttonProps = {
    role: 'tab',
    className: prefix('accordion-element', 'toggle'),
    onClick: change,
    'aria-expanded': !collapsed
  }

  // Build props for collapse element
  const collapseProps = {
    role: 'tabpanel',
    className: prefix('accordion-element', 'content'),
    smooth: smooth,
    animationSpeed: animationSpeed,
    collapsed: collapsed,
    'aria-hidden': collapsed
  }

  const renderIcon = collapsed ? renderOpenIcon : renderCloseIcon
  const icon = renderIcon ? (
    <span className={prefix('accordion-element', 'toggle-icon')}>
      {renderIcon(option, { ...props, id, collapsed })}
    </span>
  ) : null

  // Build class name for inner elements
  const buttonInnerClsName = prefix('accordion-element', 'toggle-inner')
  const contentInnerClsName = prefix('accordion-element', 'content-inner')

  return (
    <div className={className} key={`${index}--${id}`}>
      <button type='button' {...buttonProps}>
        <div className={buttonInnerClsName}>
          {option.label}
          {icon}
        </div>
      </button>
      <Collapse {...collapseProps}>
        <div className={contentInnerClsName}>
          {option.content}
        </div>
      </Collapse>
    </div>
  )
}

/**
 * Check if both lists contain same elements.
 * This function is intented for user only here,
 * as it has some problems (which do not apply to Accordion),
 * i.e. compare [ 1, 1, 2 ] with [ 1, 2, 2 ]
 *
 * @param {array} prevList
 * @param {array} nextList
 * @returns {boolean}
 */
function isSameList (prevList, nextList) {
  if (prevList.length !== nextList.length) {
    return false
  }

  for (let i = 0; i < prevList.length; i++) {
    if (nextList.indexOf(prevList[i]) === -1) {
      return false
    }
  }

  return true
}

/**
 * Component which represents checkbox.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {node} [props.children]
 * @param {function} props.onChange
 * @param {function} props.buildId
 * @param {function} [props.renderOpenIcon]
 * @param {function} [props.renderCloseIcon]
 * @param {*|array} [props.value]
 * @param {boolean} props.smooth
 * @param {boolean} props.multi
 * @param {number} props.animationSpeed
 *
 * @property {object} state
 * @property {array} state.value
 *
 * @class
 */
class Accordion extends React.PureComponent {
  state = {
    value: this.props.value == null ? [] : [].concat(this.props.value)
  }

  /**
   * Update current value in component state,
   * when value is controlled.
   *
   * @param {object} props
   */
  componentWillReceiveProps (props) {
    if (props.value !== undefined && props.value !== this.state.value) {
      this.setState({
        value: props.value == null ? [] : [].concat(props.value)
      })
    }
  }

  /**
   * Change value for self-controlled component,
   * or only send event with new value.
   *
   * @param {*} nextValue
   */
  change = nextValue => {
    const { value, multi, onChange } = this.props
    const { value: prevValue } = this.state

    if (isSameList(prevValue, nextValue)) {
      return
    }

    // Update value when it's self-controlled
    if (value === undefined) {
      this.setState({ value: nextValue })
    }

    if (!multi) {
      nextValue = nextValue.length ? nextValue[0] : null
    }

    // Send event with new value
    if (onChange) {
      onChange(nextValue)
    }
  }

  /**
   * Open section
   *
   * @param {*} id
   */
  onOpen = id => {
    const { multi } = this.props
    const { value } = this.state

    const nextValue = multi ? value.filter(x => x !== id).concat(id) : [ id ]

    this.change(nextValue)
  }

  /**
   * Close section
   *
   * @param {*} id
   */
  onClose = id => {
    const { multi } = this.props
    const { value } = this.state

    const nextValue = multi ? value.filter(x => x !== id) : []

    this.change(nextValue)
  }

  /**
   * Render accordion.
   *
   * @returns {React.Element}
   */
  render () {
    const {
      options, className, smooth, animationSpeed, value, multi,
      buildId, onChange, renderOpenIcon, renderCloseIcon, ...passedProps
    } = this.props

    // Get current value
    const _value = this.state.value

    // Calculate animation time
    const time = parseInt(animationSpeed, 10) || null

    // Build class name for Accordion
    const clsName = buildClassName('accordion', className)

    // Prepare accordion element factory
    const _buildElement = buildElement.bind(null, {
      onOpen: this.onOpen,
      onClose: this.onClose,
      buildId: buildId,
      value: _value,
      smooth: smooth,
      animationSpeed: time,
      renderOpenIcon: renderOpenIcon,
      renderCloseIcon: renderCloseIcon
    })

    // Build accordion elements
    const elements = options.map(_buildElement)

    return (
      <div className={clsName} {...passedProps}>
        {elements}
      </div>
    )
  }
}

Accordion.displayName = 'Accordion'

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
