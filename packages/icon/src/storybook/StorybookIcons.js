import React from 'react'
import IconsOverview from './IconsOverview'

// Gather all available icons
const icons = require('../../meta/overview.json')

/**
 * Component to show all icons in story book
 *
 * @class
 * @extends {React.Component}
 */
class StorybookIcons extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.onQueryChange = this.onQueryChange.bind(this)

    this.state = {
      query: ''
    }
  }

  onQueryChange (e) {
    this.setState({ query: e.target.value })
  }

  render () {
    const { query } = this.state

    const groups = Object.keys(icons).map(group => (
      <IconsOverview
        name={group}
        icons={icons[group]}
        query={query}
        key={group}
      />
    ))

    return (
      <div className='storybook-icons-list'>
        <div>
          Search: <input type='text' value={query} onChange={this.onQueryChange} />
        </div>
        {groups}
      </div>
    )
  }
}

export default StorybookIcons
