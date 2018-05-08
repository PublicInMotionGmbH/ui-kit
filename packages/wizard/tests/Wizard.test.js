import React from 'react'
import { shallow, mount } from 'enzyme'

import { Form } from '@talixo/form'
import { TextInput } from '@talixo/text-input'
import { Checkbox } from '@talixo/checkbox'
import Wizard from '../src/Wizard'

// Components for Wizard
function Step1 (props) {
  return (
    <Form>
      <h3>Step 1</h3>
      <TextInput placeholder='First Step' />
      <Checkbox size='small'>Check</Checkbox>
      <Checkbox size='small'>Box</Checkbox>
    </Form>
  )
}

function Step2 (props) {
  return (
    <Form>
      <h3>Step 2</h3>
      <TextInput placeholder='Second Step' />
      <Checkbox size='small'>Check</Checkbox>
      <Checkbox size='small'>Box</Checkbox>
    </Form>
  )
}

function Step3 (props) {
  return (
    <Form>
      <h3>Step 3</h3>
      <TextInput placeholder='Third Step' />
      <Checkbox size='small'>Check</Checkbox>
      <Checkbox size='small'>Box</Checkbox>
    </Form>
  )
}

describe('<Wizard />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard>)

    expect(wrapper).toMatchSnapshot()
  })

  it('generate pageCount prop properly', () => {
    const wrapper = shallow(
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard>)

    expect(wrapper.find('Pagination').prop('pageCount')).toBe(3)
  })

  it('render proper steps after click buttons', () => {
    const wrapper = mount(
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard>)

    expect(wrapper.find('Step1').length).toBe(1)

    wrapper.find('li').last().simulate('click')

    expect(wrapper.find('Step1').length).toBe(0)
    expect(wrapper.find('Step2').length).toBe(1)

    wrapper.find('li').first().simulate('click')

    expect(wrapper.find('Step1').length).toBe(1)
    expect(wrapper.find('Step2').length).toBe(0)

    wrapper.unmount()
  })
})
