import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import ProgressRing from '../src/ProgressRing'
import buildCirclePath from '../utils/buildCirclePath'

const name = prefix('progress-ring')

describe('<ProgressRing />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ProgressRing />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should pass className down', () => {
    const wrapper = shallow(<ProgressRing className='abc' />)

    expect(wrapper.hasClass('abc')).toBe(true)
    expect(wrapper.hasClass(name)).toBe(true)
  })

  it('should set `type`', () => {
    const wrapper = shallow(<ProgressRing type='success' />)

    expect(wrapper.hasClass(`${name}--success`)).toBe(true)
  })

  it('should pass content inside', () => {
    const wrapper = shallow(<ProgressRing><span className='sth-test'>90</span></ProgressRing>)

    expect(wrapper.find('.sth-test').length).toBe(1)
  })

  it('should correctly set aria-valuenow', () => {
    const wrapper = shallow(<ProgressRing value={0.3} />)
    const bar = wrapper.find(`.${name}__progress`)

    expect(bar.prop('aria-valuenow')).toBe(30)
  })

  it('should show indeterminate value', () => {
    const wrapper = shallow(<ProgressRing />)

    expect(wrapper.hasClass(`${name}--indeterminate`)).toBe(true)

    wrapper.setProps({ value: NaN })

    expect(wrapper.hasClass(`${name}--indeterminate`)).toBe(true)

    wrapper.setProps({ value: 0 })

    expect(wrapper.hasClass(`${name}--indeterminate`)).toBe(false)
  })

  it('should show completed value', () => {
    const wrapper = shallow(<ProgressRing value={1} />)

    expect(wrapper.hasClass(`${name}--completed`)).toBe(true)

    wrapper.setProps({ value: 0.3 })

    expect(wrapper.hasClass(`${name}--completed`)).toBe(false)
  })

  it('should pass custom props down', () => {
    const wrapper = shallow(<ProgressRing style={{ display: 'block' }} tabIndex={3} />)

    expect(wrapper.prop('tabIndex')).toEqual(3)
    expect(wrapper.prop('style')).toEqual({
      display: 'block'
    })
  })

  it('should handle correct value', () => {
    const wrapper = shallow(<ProgressRing value={0.3} />)

    expect(wrapper.find('path').prop('d')).toBe(buildCirclePath(0.3))

    wrapper.setProps({ value: 0 })
    expect(wrapper.find('path').prop('d')).toBe(buildCirclePath(0))

    wrapper.setProps({ value: 1 })
    expect(wrapper.find('path').prop('d')).toBe(buildCirclePath(1))
  })

  it('should handle incorrect value', () => {
    const wrapper = shallow(<ProgressRing value={100} />)

    expect(wrapper.find('path').prop('d')).toBe(buildCirclePath(1))

    wrapper.setProps({ value: -5 })
    expect(wrapper.find('path').prop('d')).toBe(buildCirclePath(0))
  })

  it('should handle indeterminate value', () => {
    const wrapper = shallow(<ProgressRing />)

    expect(wrapper.find('path').length).toBe(0)

    wrapper.setProps({ value: NaN })
    expect(wrapper.find('path').length).toBe(0)

    wrapper.setProps({ value: null })
    expect(wrapper.find('path').length).toBe(0)
  })
})
