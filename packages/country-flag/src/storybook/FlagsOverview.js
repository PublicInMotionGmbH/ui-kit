import React from 'react'
import PropTypes from 'prop-types'

import FlagPreview from './FlagPreview'

/**
 * Component which shows overview of specified icons
 *
 * @param {object} props
 * @param {string[]} props.icons
 * @param {string} [props.query]
 * @returns {React.Element}
 */
function FlagsOverview (props) {
  const icons = props.query ? props.icons.filter(x => x.indexOf(props.query) !== -1) : props.icons

  const elements = icons.map(name => <FlagPreview key={name} name={name} />)

  if (!icons.length) {
    return null
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <div className='storybook-icons'>
        {elements}
      </div>
    </div>
  )
}

FlagsOverview.propTypes = {
  /** Group name */
  name: PropTypes.string,

  /** List of icons to show */
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** Query string */
  query: PropTypes.string
}

export default FlagsOverview
