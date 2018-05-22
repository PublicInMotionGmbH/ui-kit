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

    const [ cardHolderName, cardNumber, cardExpirationDate, cvc ] = wrapper.find('FormField').map(n => n.props().value)

    expect(cardHolderName).toEqual(values.cardHolderName)
    expect(cardNumber).toEqual(values.cardNumber)
    expect(cardExpirationDate).toEqual(values.cardExpirationDate)
    expect(cvc).toEqual(values.cvc)
  })

  it('handles custom labels', () => {
    const customValues = {
      cardHolderNameLabel: 'Nombre en la tarjeta*',
      cardNumberLabel: 'Número de tarjeta*',
      cardExpirationDateLabel: 'Fecha de caducidad*',
      cvcLabel: 'CVC*'
    }

    const wrapper = shallow(<CreditCardInput
      cardHolderNameLabel={customValues.cardHolderNameLabel}
      cardNumberLabel={customValues.cardNumberLabel}
      cardExpirationDateLabel={customValues.cardExpirationDateLabel}
      cvcLabel={customValues.cvcLabel}
    />)

    const [ cardHolderName, cardNumber, cardExpirationDate, cvc ] = wrapper.find('FormField').map(n => n)

    expect(cardHolderName.props().label).toEqual(customValues.cardHolderNameLabel)
    expect(cardNumber.props().label).toEqual(customValues.cardNumberLabel)
    expect(cardExpirationDate.props().label).toEqual(customValues.cardExpirationDateLabel)
    expect(cvc.props().label).toEqual(customValues.cvcLabel)
  })

  it('handles custom header', () => {
    const header = 'Custom header'
    const wrapper = shallow(<CreditCardInput header={header} />)

    const legendHeader = wrapper.children().at(0).text()

    expect(legendHeader).toEqual(header)
  })
})

describe('change', () => {
  it('onChange passes value and name', () => {
    const output = {}
    const onChange = jest.fn().mockImplementation((value, name) => { output[name] = value })
    const wrapper = shallow(<CreditCardInput onChange={onChange} />)

    const [ cardHolderName, cardNumber, cardExpirationDate, cvc ] = wrapper.find('FormField').map(n => n)

    cardHolderName.simulate('change', values.cardHolderName)
    cardNumber.simulate('change', values.cardNumber)
    cardExpirationDate.simulate('change', values.cardExpirationDate)
    cvc.simulate('change', values.cvc)

    expect(output).toEqual(values)
  })
})
