import React from 'react'
import PropTypes from 'prop-types'

import defaultIconsMap from './defaultIconsMap'

export const moduleName = 'address'

const propTypes = {
  /** Map of address type => corresponding icon name */
  types: PropTypes.objectOf(PropTypes.string),

  /** Components which should be rendered with this context. */
  children: PropTypes.node
}

const defaultProps = {
  types: defaultIconsMap
}

const childContextTypes = {
  addressTypesIconMap: PropTypes.objectOf(PropTypes.string)
}

/**
 * This is a component which represents a place Address.
 *
 * @param {object} props
 * @param {object} [props.types]
 * @param {*} props.children
 *
 * @returns {React.Element}
 */
class AddressIconsProvider extends React.Component {
  getChildContext () {
    return {
      addressTypesIconMap: this.props.types
    }
  }

  render () {
    return this.props.children
  }
}

AddressIconsProvider.displayName = 'AddressIconProvider'

AddressIconsProvider.childContextTypes = childContextTypes
AddressIconsProvider.propTypes = propTypes
AddressIconsProvider.defaultProps = defaultProps

export default AddressIconsProvider
