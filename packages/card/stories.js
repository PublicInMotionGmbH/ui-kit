import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Icon } from '@talixo/icon'

import Card from './src/Card'
import CardHeader from './src/CardHeader'
import CardContent from './src/CardContent'
import CardFooter from './src/CardFooter'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Card', module, {
  propTables: [ Card, CardHeader, CardContent, CardFooter ]
})

addStory('cards', readme, () => (
  <div style={{ width: '600px' }}>
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
  </div>
))
