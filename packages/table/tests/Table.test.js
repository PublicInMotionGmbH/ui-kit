import React from 'react'
import { shallow, mount } from 'enzyme'

import Table from '../src/Table'

import Head from '../src/Head'
import Body from '../src/Body'
import Footer from '../src/Footer'

import HeadCell from '../src/HeadCell'
import ActionsCell from '../src/ActionsCell'
import Action from '../src/Action'
import Cell from '../src/Cell'
import Row from '../src/Row'

describe('<Table />', () => {
  it('renders empty table correctly', () => {
    const wrapper = shallow(<Table />)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders table with children correctly', () => {
    const wrapper = shallow(
      <Table>
        <Head />
        <Body />
        <Footer />
      </Table>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders simple table with children correctly', () => {
    const wrapper = mount(
      <Table>
        <Head>
          <HeadCell>ID</HeadCell>
          <HeadCell>Name</HeadCell>
        </Head>
        <Body>
          <Row>
            <Cell>1</Cell>
            <Cell>John Doe</Cell>
          </Row>
          <Row>
            <Cell>2</Cell>
            <Cell>Johnny Doe</Cell>
          </Row>
          <Row>
            <Cell>3</Cell>
            <Cell>John Doee</Cell>
          </Row>
        </Body>
        <Footer>
          <Cell colSpan={2}>
            Showing 10 of 20 entries.
          </Cell>
        </Footer>
      </Table>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders table with children (and actions) correctly', () => {
    const wrapper = mount(
      <Table>
        <Head>
          <HeadCell>ID</HeadCell>
          <HeadCell>Name</HeadCell>
          <HeadCell>Manage</HeadCell>
        </Head>
        <Body>
          <Row>
            <Cell>1</Cell>
            <Cell>John Doe</Cell>
            <ActionsCell>
              <Action icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
          <Row>
            <Cell>2</Cell>
            <Cell>Johnny Doe</Cell>
            <ActionsCell>
              <Action icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
          <Row>
            <Cell>3</Cell>
            <Cell>John Doee</Cell>
            <ActionsCell>
              <Action icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
        </Body>
        <Footer>
          <Cell colSpan={3}>
            Showing 10 of 20 entries.
          </Cell>
        </Footer>
      </Table>
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders table with special properties properly', () => {
    const wrapper = shallow(
      <Table className='tablet' condensed fixed>
        <Head className='head'>
          <HeadCell className='head-cell'>ID</HeadCell>
          <HeadCell className='head-cell'>Name</HeadCell>
          <HeadCell className='head-cell'>Manage</HeadCell>
        </Head>
        <Body className='t-body'>
          <Row className='t-row'>
            <Cell className='t-cell'>1</Cell>
            <Cell>John Doe</Cell>
            <ActionsCell className='head-cell' vertical>
              <Action className='special-action' icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
          <Row>
            <Cell>2</Cell>
            <Cell>Johnny Doe</Cell>
            <ActionsCell vertical>
              <Action icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
          <Row>
            <Cell>3</Cell>
            <Cell>John Doee</Cell>
            <ActionsCell vertical>
              <Action icon='done' label='Done' />
              <Action icon='settings' label='Settings' />
            </ActionsCell>
          </Row>
        </Body>
        <Footer>
          <Cell colSpan={3}>
            Showing 10 of 20 entries.
          </Cell>
        </Footer>
      </Table>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
