import React from 'react'
import PropTypes from 'prop-types'

import IconPreview from './IconPreview'

// Set up user-friendly labels for common icons
const labels = {
  'custom': 'Custom Icons',
  'material': 'Material UI',
  'material/action': 'Material UI: Action',
  'material/alert': 'Material UI: Alert',
  'material/av': 'Material UI: AV',
  'material/communication': 'Material UI: Communication',
  'material/content': 'Material UI: Content',
  'material/device': 'Material UI: Device',
  'material/editor': 'Material UI: Editor',
  'material/file': 'Material UI: File',
  'material/hardware': 'Material UI: Hardware',
  'material/image': 'Material UI: Image',
  'material/maps': 'Material UI: Maps',
  'material/navigation': 'Material UI: Navigation',
  'material/notification': 'Material UI: Notification',
  'material/places': 'Material UI: Places',
  'material/social': 'Material UI: Social',
  'material/toggle': 'Material UI: Toggle'
}

/**
 * Component which shows overview of specified icons
 *
 * @param {object} props
 * @param {string[]} props.icons
 * @param {string} [props.query]
 * @returns {React.Element}
 */
function IconsOverview (props) {
  const icons = props.query ? props.icons.filter(x => x.indexOf(props.query) !== -1) : props.icons

  const elements = icons.map(name => <IconPreview key={name} name={name} />)

  if (!icons.length) {
    return null
  }

  return (
    <div>
      <h2>{labels[props.name] || props.name}</h2>
      <div className='storybook-icons'>
        {elements}
      </div>
    </div>
  )
}

IconsOverview.propTypes = {
  /** Group name */
  name: PropTypes.string,

  /** List of icons to show */
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** Query string */
  query: PropTypes.string
}

export default IconsOverview
