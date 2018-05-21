import React from 'react'
import { shallow } from 'enzyme'

import CreditCardInput from '../src/CreditCardInput'

const values = {
  cardHolderName: 'John Doe',
  cardNumber: '1234',
  cardExpirationDate: {
    month: 1,
    year: 34
  },
  cvc: '123'
}

describe('<CreditCardInput />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CreditCardInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('passes values correctly', () => {
    const wrapper = shallow(<CreditCardInput values={values} />)
    const cardHolderName = wrapper.find('FormField').at(0).props().value
    const cardNumber = wrapper.find('FormField').at(1).props().value
    const cardExpirationDate = wrapper.find('FormField').at(2).props().value
    const cvc = wrapper.find('FormField').at(3).props().value

    expect(cardHolderName).toEqual(values.cardHolderName)
    expect(cardNumber).toEqual(values.cardNumber)
    expect(cardExpirationDate).toEqual(values.cardExpirationDate)
    expect(cvc).toEqual(values.cvc)
  })
})

describe('change', () => {
  it('onChange passes value and name', () => {
    const output = {}
    const onChange = jest.fn().mockImplementation((value, name) => { output[name] = value })
    const wrapper = shallow(<CreditCardInput onChange={onChange} />)

    const cardHolderName = wrapper.find('FormField').at(0)
    const cardNumber = wrapper.find('FormField').at(1)
    const cardExpirationDate = wrapper.find('FormField').at(2)
    const cvc = wrapper.find('FormField').at(3)

    cardHolderName.simulate('change', values.cardHolderName)
    cardNumber.simulate('change', values.cardNumber)
    cardExpirationDate.simulate('change', values.cardExpirationDate)
    cvc.simulate('change', values.cvc)

    expect(output).toEqual(values)
  })
})
