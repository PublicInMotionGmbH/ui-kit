import React from 'react'
import { shallow } from 'enzyme'

import ProgressBar from '../src/ProgressBar'

describe('<ProgressBar />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ProgressBar />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle `striped` property', () => {
    const wrapper = shallow(<ProgressBar striped />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle `size` property', () => {
    const wrapper = shallow(<ProgressBar size='small' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle `type` property', () => {
    const wrapper = shallow(<ProgressBar type='error' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle `smooth` property', () => {
    const wrapper = shallow(<ProgressBar smooth />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle labels properly', () => {
    const wrapper = shallow(<ProgressBar>loading something...</ProgressBar>)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle correct `value` property', () => {
    const wrappers = {
      zero: shallow(<ProgressBar value={0} />),
      finished: shallow(<ProgressBar value={1} />),
      normal: shallow(<ProgressBar value={0.3} />),
      bigger: shallow(<ProgressBar value={1.5} />),
      lower: shallow(<ProgressBar value={-0.3} />),
      string: shallow(<ProgressBar value={'0.3'} />)
    }

    expect(wrappers.zero).toMatchSnapshot()
    expect(wrappers.finished).toMatchSnapshot()
    expect(wrappers.normal).toMatchSnapshot()
    expect(wrappers.bigger).toMatchSnapshot()
    expect(wrappers.lower).toMatchSnapshot()
    expect(wrappers.string).toMatchSnapshot()
  })

  it('should handle indeterminate value', () => {
    const wrappers = {
      nan: shallow(<ProgressBar value={NaN} />),
      empty: shallow(<ProgressBar />),
      string: shallow(<ProgressBar value={'foobar'} />)
    }

    expect(wrappers.nan).toMatchSnapshot()
    expect(wrappers.empty).toMatchSnapshot()
    expect(wrappers.string).toMatchSnapshot()
  })

  it('should allow passing unknown properties', () => {
    const wrapper = shallow(<ProgressBar style={{ margin: 20 }} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should handle all properties together', () => {
    const wrapper = shallow(
      <ProgressBar
        size='small'
        type='error'
        smooth={false}
        value={0.3}
        striped
      >
        Loading tests...
      </ProgressBar>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
