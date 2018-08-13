import React from 'react'
import { shallow } from 'enzyme'
import checkPropTypes from 'check-prop-types'

import Avatar from '../src/Avatar'

describe('<Avatar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Avatar>H</Avatar>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders font size 40 by default', () => {
    const wrapper = shallow(<Avatar>H</Avatar>)
    const fontSize = wrapper.props().style.fontSize
    expect(fontSize).toEqual(40)
  })

  it('renders rounded avatar correctly', () => {
    const wrapper = shallow(<Avatar rounded>H</Avatar>)
    const className = wrapper.props().className
    expect(className).toMatch(/(^| )talixo-avatar--rounded( |$)/)
  })

  it('renders size correctly', () => {
    const wrapper = shallow(<Avatar size={120}>H</Avatar>)
    const fontSize = wrapper.props().style.fontSize
    expect(fontSize).toEqual(120)
  })

  describe('passes \'childProps\' correctly', () => {
    it('for \'src\'', () => {
      const wrapper = shallow(<Avatar defaultIcon='avatar' src='./avatar.jpg' alt='avatar' />)
      const child = wrapper.find('AvatarChildRenderer')
      const childProps = {alt: 'avatar', defaultIcon: 'avatar', src: './avatar.jpg'}
      expect(child.props()).toEqual(childProps)
    })

    it('for \'srcSet\'', () => {
      const srcSet = './avatar-320w.jpg 320w, ./avatar-480w.jpg 480w, ./avatar-800w.jpg 800w'
      const wrapper = shallow(<Avatar defaultIcon='avatar' srcSet={srcSet} alt='avatar' />)
      const child = wrapper.find('AvatarChildRenderer')
      const childProps = {alt: 'avatar', defaultIcon: 'avatar', srcSet}
      expect(child.props()).toEqual(childProps)
    })

    it('for \'icon\'', () => {
      const wrapper = shallow(<Avatar icon='avatar' />)
      const child = wrapper.find('AvatarChildRenderer')
      const childProps = { icon: 'avatar' }
      expect(child.props()).toEqual(childProps)
    })

    it('for children', () => {
      const wrapper = shallow(<Avatar>H</Avatar>)
      const child = wrapper.find('AvatarChildRenderer')
      const childProps = { children: 'H' }
      expect(child.props()).toEqual(childProps)
    })
  })
})

describe('PropTypes', () => {
  it('throws error if no avatar content is provided', () => {
    const assertPropTypes = checkPropTypes.assertPropTypes
    const props = {
      src: null,
      srcSet: null,
      children: null,
      icon: null
    }
    expect(() => assertPropTypes(Avatar.propTypes, props, 'prop', 'Avatar')).toThrow()
  })

  it('throws error if more than one avatar content is provided', () => {
    const assertPropTypes = checkPropTypes.assertPropTypes
    const props = {
      src: './avatar.jpg',
      srcSet: null,
      children: 'H',
      icon: 'avatar'
    }
    expect(() => assertPropTypes(Avatar.propTypes, props, 'prop', 'Avatar')).toThrow()
  })

  it('throws error if more than one default content is provided', () => {
    const assertPropTypes = checkPropTypes.assertPropTypes
    const props = {
      defaultIcon: 'avatar',
      defaultText: 'H'
    }
    expect(() => assertPropTypes(Avatar.propTypes, props, 'prop', 'Avatar')).toThrow()
  })
})
