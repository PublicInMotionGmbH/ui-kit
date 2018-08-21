import React from 'react'
import { shallow } from 'enzyme'
import checkPropTypes from 'check-prop-types'

import AvatarChildRenderer from '../src/AvatarChildRenderer'

describe('<AvatarChildRenderer />', () => {
  it('renders text correctly', () => {
    const wrapper = shallow(<AvatarChildRenderer>H</AvatarChildRenderer>)
    const text = wrapper.text()
    expect(text).toEqual('H')
  })

  it('renders icon correctly', () => {
    const wrapper = shallow(<AvatarChildRenderer icon='avatar' />)
    const icon = wrapper.find('Icon')
    expect(icon.props().name).toEqual('avatar')
  })

  it('renders src correctly', () => {
    const wrapper = shallow(<AvatarChildRenderer src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    expect(image.props().src).toEqual('./avatar.jpg')
    expect(image.props().alt).toEqual('avatar')
  })

  it('renders srcSet correctly', () => {
    const srcSet = './avatar-320w.jpg 320w, ./avatar-480w.jpg 480w, ./avatar-800w.jpg 800w'
    const wrapper = shallow(<AvatarChildRenderer srcSet={srcSet} alt='avatar' />)
    const image = wrapper.find('img')
    expect(image.props().srcSet).toEqual(srcSet)
    expect(image.props().alt).toEqual('avatar')
  })

  it('renders `?` on image error', () => {
    const wrapper = shallow(<AvatarChildRenderer src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const text = wrapper.text()
    expect(text).toEqual('?')
  })

  it('renders defaultText on image error', () => {
    const wrapper = shallow(<AvatarChildRenderer defaultText='A' src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const text = wrapper.text()
    expect(text).toEqual('A')
  })

  it('renders defaultIcon on image error', () => {
    const wrapper = shallow(<AvatarChildRenderer defaultIcon='avatar' src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const icon = wrapper.find('Icon')
    expect(icon.props().name).toEqual('avatar')
  })

  it('triggers handleImageError on `img` error', () => {
    const wrapper = shallow(<AvatarChildRenderer src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    expect(wrapper.state().imageError).toEqual(true)
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
    expect(() => assertPropTypes(AvatarChildRenderer.propTypes, props, 'prop', 'AvatarChildRenderer')).toThrow()
  })

  it('throws error if more than one avatar content is provided', () => {
    const assertPropTypes = checkPropTypes.assertPropTypes
    const props = {
      src: './avatar.jpg',
      srcSet: null,
      children: 'H',
      icon: 'avatar'
    }
    expect(() => assertPropTypes(AvatarChildRenderer.propTypes, props, 'prop', 'AvatarChildRenderer')).toThrow()
  })

  it('throws error if more than one default content is provided', () => {
    const assertPropTypes = checkPropTypes.assertPropTypes
    const props = {
      defaultIcon: 'avatar',
      defaultText: 'H'
    }
    expect(() => assertPropTypes(AvatarChildRenderer.propTypes, props, 'prop', 'AvatarChildRenderer')).toThrow()
  })
})
