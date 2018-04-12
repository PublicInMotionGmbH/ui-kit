import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import Table from './src/Table'
import Head from './src/Head'
import Body from './src/Body'
import Footer from './src/Footer'
import HeadCell from './src/HeadCell'
import Row from './src/Row'
import Cell from './src/Cell'
import ActionsCell from './src/ActionsCell'
import Action from './src/Action'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Table', module, {
  inline: false,
  propTypes: [ Table, Head, Body, Footer, HeadCell, Row, Cell, ActionsCell, Action ]
})

// Build default actions
const assign = action('Assign')
const duplicate = action('Duplicate')
const spam = action('Spam')
const invalid = action('Invalid')

// Stories

addStory('Tables', readme, () => (
  <div>
    <h2>Simple table</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>
      </Body>
    </Table>

    <h2>Table with footer</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>
      </Body>

      <Footer>
        <Cell colSpan={4}>Found 10 of 20 entries</Cell>
      </Footer>
    </Table>

    <h2>Table with actions</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Condensed table</h2>

    <Table condensed>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Fixed-layout table</h2>

    <Table fixed>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Table with vertical aligned actions</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>
  </div>
))

addStory('RTL: Tables', readme, () => (
  <div dir='rtl'>
    <h2>Simple table</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>
      </Body>
    </Table>

    <h2>Table with footer</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>
        </Row>
      </Body>

      <Footer>
        <Cell colSpan={4}>Found 10 of 20 entries</Cell>
      </Footer>
    </Table>

    <h2>Table with actions</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Condensed table</h2>

    <Table condensed>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Fixed-layout table</h2>

    <Table fixed>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>

    <h2>Table with vertical aligned actions</h2>

    <Table>
      <Head>
        <HeadCell>ID</HeadCell>
        <HeadCell>Date opened</HeadCell>
        <HeadCell>Date of ride</HeadCell>
        <HeadCell>Pickup/Dropoff</HeadCell>
        <HeadCell>Actions</HeadCell>
      </Head>

      <Body>
        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>

        <Row>
          <Cell>ABX3928</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>16th Jan 2018</Cell>
          <Cell>Berlin SXF Alexanderplatz</Cell>

          <ActionsCell vertical>
            <Action onClick={assign} icon='done' label='Assign' />
            <Action onClick={duplicate} icon='control_point_duplicate' label='Duplicate' />
            <Action onClick={spam} icon='delete_sweep' label='Spam' />
            <Action onClick={invalid} icon='clear' label='Invalid' warn />
          </ActionsCell>
        </Row>
      </Body>
    </Table>
  </div>
))
