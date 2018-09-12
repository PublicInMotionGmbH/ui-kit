import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Price from './src/Price'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Price', module, {
  propTables: [ Price ]
})

// Helpers

const currencyToSymbol = {
  USD: '$',
  EUR: '€',
  CRC: '₡',
  GBP: '£',
  ILS: '₪',
  INR: '₹',
  JPY: '¥',
  KRW: '₩',
  NGN: '₦',
  PHP: '₱',
  PLN: 'zł',
  PYG: '₲',
  THB: '฿',
  UAH: '₴',
  VND: '₫'
}

const examples = [
  { name: 'US Dollar', currency: 'USD' },
  { name: 'Euro', currency: 'EUR' },
  { name: 'Costa Rican Colón', currency: 'CRC' },
  { name: 'GB Pound', currency: 'GBP' },
  { name: 'Israeli New Shekel', currency: 'ILS' },
  { name: 'Indian Rupe', currency: 'INR' },
  { name: 'Japanese Yen', currency: 'JPY' },
  { name: 'South Korean Won', currency: 'KRW' },
  { name: 'Nigerian Naira', currency: 'NGN' },
  { name: 'Philippine Piso', currency: 'PHP' },
  { name: 'Polish Złoty', currency: 'PLN' },
  { name: 'Paraguayan Guarani', currency: 'PYG' },
  { name: 'Thai Baht', currency: 'THB' },
  { name: 'Ukrainian Hryvnia', currency: 'UAH' },
  { name: 'Vietnamese Dong', currency: 'VND' }
]

const maxPrice = 100000000

function getRandomPrice (MAX_PRICE = maxPrice) {
  return Math.random() * MAX_PRICE
}

// Stories

addStory('initial', readme, () => (
  <div>
    <h4>GBP currency with 'displayBefore' parameter</h4>
    <Price currency='GBP' value={getRandomPrice()} displayBefore />
    <br /><br />
    <h3>USD currency with 'displayBefore' parameter</h3>
    <Price currency='USD' value={getRandomPrice()} displayBefore />
    <br /><br />
    <h3>PLN currency</h3>
    <Price currency='PLN' value={'10000.0555'} />
    <br /><br />
    <h3>EUR currency with 'displayBefore' parameter</h3>
    <Price currency='EUR' value={getRandomPrice()} displayBefore />
  </div>
))

addStory('using locale and currency abbreviation', readme, () => (
  <div>
    <h4>JPY with 'ja' locale</h4>
    <Price locale='ja' currency='JPY' value={getRandomPrice()} />
    <br /><br />
    <h3>USD with 'us' locale</h3>
    <Price locale='us' currency='USD' value={getRandomPrice()} />
    <br /><br />
    <h3>PLN with 'pl' locale</h3>
    <Price locale='pl' currency='PLN' value={getRandomPrice()} />
    <br /><br />
    <h3>EUR with 'eu' locale</h3>
    <Price locale='eu' currency='EUR' value={getRandomPrice()} />
  </div>
))

addStory('using currency-to-symbol mapping', readme, () => (
  <div>
    {
      examples.map(example => (
        <div key={example.currency}>
          <h4>{example.name}</h4>
          <Price value={Math.random() * 1000000000} currency={example.currency} currencyToSymbol={currencyToSymbol} />
          <br /><br />
        </div>
      ))
    }
  </div>
))

addStory('with approximate symbol', readme, () => (
  <div>
    <h4>GBP</h4>
    <Price locale='en' currency='GBP' value={getRandomPrice()} approximateLabel='about' />
    <br /><br />
    <h3>USD</h3>
    <Price locale='us' currency='USD' value={getRandomPrice()} approximateLabel='~' />
    <br /><br />
    <h3>PLN</h3>
    <Price locale='pl' currency='PLN' value={getRandomPrice()} approximateLabel='około' />
    <br /><br />
    <h3>EUR</h3>
    <Price locale='eu' currency='EUR' value={getRandomPrice()} approximateLabel='more or less' />
  </div>
))

addStory('different precision', readme, () => (
  <div>
    {
      [0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
        <div>
          <h4>Precision {item}</h4>
          <Price
            currency='GBP' value={getRandomPrice() / getRandomPrice()}
            approximateLabel='about'
            precision={item}
          />
          <br /><br />
        </div>
      ))
    }
  </div>
))
