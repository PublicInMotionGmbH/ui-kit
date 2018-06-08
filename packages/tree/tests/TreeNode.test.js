import React from 'react'
import { shallow, mount } from 'enzyme'

import { prefix } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import TreeNode from '../src/TreeNode'

const moduleName = prefix('tree')

describe('<TreeNode />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<TreeNode
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('select node when click', () => {
    const wrapper = mount(<TreeNode
      onClick={() => {}}
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    wrapper.find(`.${moduleName}__node-name`).at(0).simulate('click')

    expect(wrapper.state('selected')).toBe(true)

    wrapper.find(`.${moduleName}__node-name`).at(0).simulate('click')

    expect(wrapper.state('selected')).toBe(false)

    wrapper.unmount()
  })

  it('doesn`t select node when click and selectEnabled is false', () => {
    const wrapper = mount(<TreeNode
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    wrapper.find(`.${moduleName}__node-name`).at(0).simulate('click')

    expect(wrapper.state('selected')).toBe(false)

    wrapper.unmount()
  })

  it('open node children when click on icon', () => {
    const wrapper = mount(<TreeNode
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    expect(wrapper.state('collapsed')).toBe(true)

    wrapper.find(`.${moduleName}__node-icon`).at(0).simulate('click')

    expect(wrapper.state('collapsed')).toBe(false)

    wrapper.unmount()
  })

  it('open children when initialOpen is true', () => {
    const wrapper = mount(<TreeNode
      initiallyOpen
      children={[{
        id: 1,
        name: 'animal'}]}
    />)

    expect(wrapper.state('collapsed')).toBe(false)

    wrapper.unmount()
  })

  it('shows custom nodes', () => {
    const wrapper = mount(<TreeNode
      initiallyOpen
      children={[{
        id: 1,
        name: 'animal',
        render: node => <span><Icon name='pets' /> {node}</span>}]}
    />)

    expect(wrapper.find('Icon').at(1).props().name).toBe('pets')

    wrapper.unmount()
  })
})
