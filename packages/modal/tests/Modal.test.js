import React from 'react'
import { shallow } from 'enzyme'

import Modal from '../src/Modal'

describe('<Modal />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Modal>
        <h2>Modal</h2>
      </Modal>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
