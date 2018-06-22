import React from 'react'
import { shallow } from 'enzyme'
import checkPropTypes from 'check-prop-types'

import Avatar from '../src/Avatar'

describe('<Avatar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<Avatar>H</Avatar>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders text correctly', () => {
    const wrapper = shallow(<Avatar>H</Avatar>)
    const text = wrapper.text()
    expect(text).toEqual('H')
  })

  it('renders icon correctly', () => {
    const wrapper = shallow(<Avatar icon='avatar' />)
    const icon = wrapper.find('Icon')
    expect(icon.props().name).toEqual('avatar')
  })

  it('renders src correctly', () => {
    const wrapper = shallow(<Avatar src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    expect(image.props().src).toEqual('./avatar.jpg')
    expect(image.props().alt).toEqual('avatar')
  })

  it('renders srcSet correctly', () => {
    const srcSet = './avatar-320w.jpg 320w, ./avatar-480w.jpg 480w, ./avatar-800w.jpg 800w'
    const wrapper = shallow(<Avatar srcSet={srcSet} alt='avatar' />)
    const image = wrapper.find('img')
    expect(image.props().srcSet).toEqual(srcSet)
    expect(image.props().alt).toEqual('avatar')
  })

  it('renders `?` on image error', () => {
    const wrapper = shallow(<Avatar src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const text = wrapper.text()
    expect(text).toEqual('?')
  })

  it('renders defaultText on image error', () => {
    const wrapper = shallow(<Avatar defaultText='A' src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const text = wrapper.text()
    expect(text).toEqual('A')
  })

  it('renders defaultIcon on image error', () => {
    const wrapper = shallow(<Avatar defaultIcon='avatar' src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    const icon = wrapper.find('Icon')
    expect(icon.props().name).toEqual('avatar')
  })

  it('triggers handleImageError on `img` error', () => {
    const wrapper = shallow(<Avatar src='./avatar.jpg' alt='avatar' />)
    const image = wrapper.find('img')
    image.simulate('error')
    expect(wrapper.state().imageError).toEqual(true)
  })

  it('renders square avatar by default', () => {
    const wrapper = shallow(<Avatar>H</Avatar>)
    const width = wrapper.props().style.width
    const height = wrapper.props().style.height
    const borderRadius = wrapper.props().style.borderRadius
    expect(width).toEqual(40)
    expect(height).toEqual(40)
    expect(borderRadius).toEqual(0)
  })

  it('renders rounded avatar correctly', () => {
    const wrapper = shallow(<Avatar rounded>H</Avatar>)
    const width = wrapper.props().style.width
    const height = wrapper.props().style.height
    const borderRadius = wrapper.props().style.borderRadius
    expect(width).toEqual(40)
    expect(height).toEqual(40)
    expect(borderRadius).toEqual('50%')
  })

  it('renders size correctly', () => {
    const wrapper = shallow(<Avatar size={120}>H</Avatar>)
    const width = wrapper.props().style.width
    const height = wrapper.props().style.height
    expect(width).toEqual(120)
    expect(height).toEqual(120)
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
