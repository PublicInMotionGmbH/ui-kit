import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/commons/story'

import Tab from './src/Tab'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Tab', module)

// Helper components

class TabContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'home'
    }
  }

  render () {
    const { children } = this.props
    return (
      <div>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            active: child.props.id === this.state.activeTab,
            onClick: () => this.setState({ activeTab: child.props.id })
          })
        )}
      </div>
    )
  }
}

// Stories

addStory('default', readme, () => (
  <Tab>Home</Tab>
))
addStory('group', readme, () => (
  <TabContainer>
    <Tab id='home'>Home</Tab>
    <Tab id='issues'>Issues</Tab>
    <Tab id='projects'>Projects</Tab>
    <Tab id='help'>Help</Tab>
  </TabContainer>
))
