import React from 'react'
import { shallow } from 'enzyme'

import { prefix } from '@talixo/shared'

import ProgressRing from '../src/ProgressRing'
import drawStroke from '../src/drawStroke'

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

    expect(bar.prop('aria-valuenow')).toBe(0.3)
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

  it('should set value to 0 when value below 0', () => {
    const wrapper = shallow(<ProgressRing value={-1} />)

    expect(wrapper.find('.talixo-progress-ring__circle-stroke').prop('strokeDashoffset')).toBe(drawStroke(-1))
  })

  it('should set value to 1 when value exceed 1', () => {
    const wrapper = shallow(<ProgressRing value={1.5} />)

    expect(wrapper.find('.talixo-progress-ring__circle-stroke').prop('strokeDashoffset')).toBe(drawStroke(1.5))
  })

  it('should set value to 0.25 when value is empty', () => {
    const wrapper = shallow(<ProgressRing />)

    expect(wrapper.find('.talixo-progress-ring__circle-stroke').prop('strokeDashoffset')).toBe(drawStroke())
  })

  it('should handle incorrect value', () => {
    const wrapper = shallow(<ProgressRing value='Not an Number' />)

    expect(wrapper.find('.talixo-progress-ring__circle-stroke').prop('strokeDashoffset')).toBe(drawStroke('Not an Number'))
  })

  it('should set proper value when props value is equal 0', () => {
    const wrapper = shallow(<ProgressRing value={0} />)

    expect(wrapper.find('.talixo-progress-ring__circle-stroke').prop('strokeDashoffset')).toBe(drawStroke(0))
  })

  it('should pass class prop correctly', () => {
    const wrapper = shallow(<ProgressRing className='progress-ring-test-class' />)

    expect(wrapper.find('.progress-ring-test-class')).toHaveLength(1)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='primary' />)

    expect(wrapper.hasClass('talixo-progress-ring--primary')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='secondary' />)

    expect(wrapper.hasClass('talixo-progress-ring--secondary')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='tertiary' />)

    expect(wrapper.hasClass('talixo-progress-ring--tertiary')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='success' />)

    expect(wrapper.hasClass('talixo-progress-ring--success')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='error' />)

    expect(wrapper.hasClass('talixo-progress-ring--error')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='info' />)

    expect(wrapper.hasClass('talixo-progress-ring--info')).toEqual(true)
  })

  it('should pass type prop correctly', () => {
    const wrapper = shallow(<ProgressRing type='warning' />)

    expect(wrapper.hasClass('talixo-progress-ring--warning')).toEqual(true)
  })

  it('should set class `completed` when value equal or greater than 1', () => {
    const wrapper = shallow(<ProgressRing value={1} />)

    expect(wrapper.hasClass('talixo-progress-ring--completed')).toEqual(true)
  })
})
