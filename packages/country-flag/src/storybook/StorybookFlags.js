import React from 'react'
import FlagsOverview from './FlagsOverview'

// Gather all available icons
const icons = require('../../sprites/meta')

/**
 * Component to show all icons in story book
 *
 * @class
 * @extends {React.Component}
 */
class StorybookFlags extends React.Component {
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

    return (
      <div className='storybook-icons-list'>
        <div>
          Search: <input type='text' value={query} onChange={this.onQueryChange} />
        </div>
        <FlagsOverview
          name='Available flags'
          icons={icons}
          query={query}
        />
      </div>
    )
  }
}

export default StorybookFlags
