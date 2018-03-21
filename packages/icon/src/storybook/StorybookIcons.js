import React from 'react'
import IconsOverview from './IconsOverview'
import { classPrefix } from '@talixo/icon-pack/metadata'

// Gather all available icons
const icons = require('../../meta/overview.json')

// Prepare styles for Storybook
const style = `
.storybook-icons-list {
  font-family: 'Open Sans', Arial, Tahoma, Sans;
}

.storybook-icons {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
  font-family: 'Open Sans', Arial, Tahoma, Sans;
}
.storybook-icons__icon {
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 120px;
  height: 90px;
  line-height: 60px;
  font-size: 48px;
  text-align: center;
  color: #999;
  margin: 5px;
  border: 1px solid #eee;
}
.storybook-icons__label {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  display: block;
  height: 22px;
  line-height: 20px;
  font-size: 10px;
  padding: 0 10px;
  text-align: center;
  color: #666;
  border-color: transparent;
  border-style: solid;
  border-width: 1px 0;
  bottom: -1px;
  background: #eee;
  overflow: hidden;
  text-overflow: ellipsis;
}
.storybook-icons__icon:hover .${classPrefix} {
  color: #f03a1f;
}
.storybook-icons__icon:hover .storybook-icons__label {
  width: auto;
  min-width: 100%;
  min-width: calc(100% + 2px);
  left: 50%;
  border: 1px solid #ccc;
  transform: translateX(-50%);
  text-overflow: none;
  overflow: visible;
  z-index: 2;
}
`

// Prepare React element for styling
const styleElement = (
  <style dangerouslySetInnerHTML={{ __html: style }} />
)

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
        {styleElement}
        {groups}
      </div>
    )
  }
}

export default StorybookIcons
