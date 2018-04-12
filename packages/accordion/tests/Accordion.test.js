import React from 'react'
import { shallow } from 'enzyme'

import Accordion from '../src/Accordion'

const options = [
  { id: 1, label: 'First one', content: 'Something is there' },
  { id: 'another', label: 'Another', content: <strong>Also here we've got some content</strong> },
  { id: 'third', label: 'Third', content: 'Here we are' },
  { id: 'multiple', label: 'Multi', content: 'And there is multiple' },
  { id: 'multiple', label: 'Multi 2', content: 'element selected' }
]

describe('<Accordion />', () => {
  it('renders closed accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={null}
        animationTime={100}
        options={options}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders opened accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        animationTime={100}
        options={options}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders not smooth accordion correctly', () => {
    const wrapper = shallow(
      <Accordion
        value={1}
        smooth={false}
        options={options}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
