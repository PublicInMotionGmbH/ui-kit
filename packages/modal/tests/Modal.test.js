import React from 'react'
import Modal from '../src/Modal'
import { shallow } from 'enzyme'

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
