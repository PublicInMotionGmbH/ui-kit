import React from 'react'

import Card from './src/Card'
import CardHeader from './src/CardHeader'
import CardContent from './src/CardContent'
import CardFooter from './src/CardFooter'
import Icon from '../../packages/icon/src/Icon'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/commons/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Card', module)

addStory('cards', readme, () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '10px' }}>
    <Card>
      <CardHeader title='R.M.'>
        <img
          src='https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
          alt='city'
        />
      </CardHeader>
      <CardContent>
        This was one of the best experiences I have ever had with a cab company. I had problems at the airport and the
        driver stayed with me for over an hour and helped me sort everything out. I would recommend this company to
        anyone. Thank you for such fabulous service!
      </CardContent>
      <CardFooter>
        <Icon name='person_add' />
        <Icon name='star' />
      </CardFooter>
    </Card>
    <Card>
      <CardHeader title='M. Vogel, VOGEL Ingenieure'>
        <img src='http://www.eu-startups.com/wp-content/uploads/2017/07/Talixo-startup.jpg' alt='app' />
      </CardHeader>
      <CardContent>
        Ich möchte mich für den super Service Ihrer Fahrer/in bedanken. Das war Klasse, sehr flexibel und absolut
        empfehlenswert!
      </CardContent>
      <CardFooter>
        <Icon name='person_add' />
        <Icon name='star' />
      </CardFooter>
    </Card>
    <Card>
      <CardHeader title='T. M.'>
        <img
          src='https://images.pexels.com/photos/769155/pexels-photo-769155.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
          alt='taxi'
        />
      </CardHeader>
      <CardContent>
        We were very pleased with the service and would happily use it again when we are next in Germany.
      </CardContent>
      <CardFooter>
        <Icon name='person_add' />
        <Icon name='star' />
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <img src='https://static.talixo.de/public/images/developers_hero.jpg' alt='laptop' />
      </CardHeader>
      <CardContent>
        Every day Talixo helps thousands of people getting where they need to be. This is your opportunity! Use or
        develop our products to boost your volumes, and get access to the global transfers market!
      </CardContent>
      <CardFooter>
        <Icon name='person_add' />
        <Icon name='star' />
      </CardFooter>
    </Card>
  </div>
))
