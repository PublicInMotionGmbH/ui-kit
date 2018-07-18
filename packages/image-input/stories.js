import React from 'react'
import { action } from '@storybook/addon-actions'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import ImageInput from './src/ImageInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Image Input', module, {
  propTables: [ ImageInput ]
})

// Image
const image = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAyMDAxMDkwNC8vRU4iDQoiaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQiDQpbDQogPCFBVFRMSVNUIHN2Zw0KICB4bWxuczp4bGluayBDREFUQSAjRklYRUQgImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KXT4NCjwhLS0gQ3JlYXRlZCB3aXRoIFNvZGlwb2RpICgiaHR0cDovL3d3dy5zb2RpcG9kaS5jb20vIikgLS0+DQo8c3ZnDQogICB4bWw6c3BhY2U9InByZXNlcnZlIg0KICAgd2lkdGg9IjEyOHB0Ig0KICAgaGVpZ2h0PSIxMjhwdCINCiAgIHZpZXdCb3g9IjAgMCA1MDcuOTQ2IDUwNy45NDYiDQogICBpZD0ic3ZnNDkiDQogICBzb2RpcG9kaTp2ZXJzaW9uPSIwLjI3Ig0KICAgc29kaXBvZGk6ZG9jbmFtZT0iL21udC93aW5kb3dzL1RoZW1lcy9Xb3JrL0JsdWUtU3BoZXJlL2Fycm93LXJpZ2h0LXNtYWxsLnN2ZyINCiAgIHNvZGlwb2RpOmRvY2Jhc2U9Ii9tbnQvd2luZG93cy9UaGVtZXMvV29yay9CbHVlLVNwaGVyZS8iDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzNjIiPg0KICAgIDxyYWRpYWxHcmFkaWVudA0KICAgICAgIGlkPSJhaWdyZDEiDQogICAgICAgY3g9IjIxOC45NDA0Ig0KICAgICAgIGN5PSIyMTkuNzcxNSINCiAgICAgICByPSIxNTAuNzA2MyINCiAgICAgICBmeD0iMjE4Ljk0MDQiDQogICAgICAgZnk9IjIxOS43NzE1Ig0KICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIg0KICAgICAgIHN0eWxlPSJzdHJva2U6IzAwMDAwMDtzdHJva2Utb3BhY2l0eTowLjk4NjAxNDtzdHJva2Utd2lkdGg6MC45ODE2MTI7Ij4NCiAgICAgIDxzdG9wDQogICAgICAgICBvZmZzZXQ9IjAiDQogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojNzNmZmZmO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1vcGFjaXR5OjAuOTg2MDE0O3N0cm9rZS13aWR0aDowLjk4MTYxMjsiDQogICAgICAgICBpZD0ic3RvcDUzIiAvPg0KICAgICAgPHN0b3ANCiAgICAgICAgIG9mZnNldD0iMC4yODA5Ig0KICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6IzJFQTZCOTtzdHJva2U6IzAwMDAwMDtzdHJva2Utb3BhY2l0eTowLjk4NjAxNDtzdHJva2Utd2lkdGg6MC45ODE2MTI7Ig0KICAgICAgICAgaWQ9InN0b3A1NCIgLz4NCiAgICAgIDxzdG9wDQogICAgICAgICBvZmZzZXQ9IjEiDQogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDA2YjhiO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1vcGFjaXR5OjAuOTg2MDE0O3N0cm9rZS13aWR0aDowLjk4MTYxMjsiDQogICAgICAgICBpZD0ic3RvcDU1IiAvPg0KICAgIDwvcmFkaWFsR3JhZGllbnQ+DQogIDwvZGVmcz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBpZD0iYmFzZSIgLz4NCiAgPHBhdGgNCiAgICAgc3R5bGU9ImZvbnQtc2l6ZToxMjtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45NzkyNjg7c3Ryb2tlLW9wYWNpdHk6MC45ODYwMTQ7ZmlsbDojYTRjOWVlO2ZpbGwtb3BhY2l0eTowLjc7Ig0KICAgICBkPSJNMTM0Ljc1NywyNjMuNzc2YzAsNjYuNzM5LDU0LjI5OCwxMjEuMDQsMTIxLjAzOSwxMjEuMDRjNjYuNzM5LDAsMTIxLjAzOS01NC4zMDEsMTIxLjAzOS0xMjEuMDRjMC02Ni43NDEtNTQuMy0xMjEuMDM5LTEyMS4wMzktMTIxLjAzOWMtNjYuNzQxLDAtMTIxLjAzOSw1NC4yOTgtMTIxLjAzOSwxMjEuMDM5eiINCiAgICAgaWQ9InBhdGg1MSINCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS44OTUxMSwwLDAsMS45MTIzNiwtMjMxLjQ1OCwtMjQ3Ljk3MSkiIC8+DQogIDxwYXRoDQogICAgIHN0eWxlPSJmb250LXNpemU6MTI7ZmlsbDp1cmwoI2FpZ3JkMSk7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMxYzY2NzE7c3Ryb2tlLXdpZHRoOjcuNzMxMDY7c3Ryb2tlLW9wYWNpdHk6MC45ODgyMzU7Ig0KICAgICBkPSJNMzU2LjY0MywyNjMuMzY2YzAsNTcuMDI3LTQ2LjIzLDEwMy4yNTctMTAzLjI1NiwxMDMuMjU3Yy01Ny4wMjcsMC0xMDMuMjU2LTQ2LjIyOS0xMDMuMjU2LTEwMy4yNTdjMC01Ny4wMjcsNDYuMjI5LTEwMy4yNTYsMTAzLjI1Ni0xMDMuMjU2ICAgICBjNTcuMDI1LDAsMTAzLjI1Niw0Ni4yMjksMTAzLjI1NiwxMDMuMjU2eiINCiAgICAgaWQ9InBhdGg1NiINCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMi4wNDQ1MSwwLDAsMi4wNDQ1MSwtMjY0LjM1MywtMjgxLjcyMykiIC8+DQogIDxwYXRoDQogICAgIHN0eWxlPSJmb250LXNpemU6MTI7b3BhY2l0eToxLjA7ZmlsbDojZmZmZmZmO3N0cm9rZTojMWM2NzcyO3N0cm9rZS13aWR0aDo0Ljk5Mjc0O3N0cm9rZS1vcGFjaXR5OjAuOTg4MjM1O2ZpbGwtb3BhY2l0eTowLjk5OyINCiAgICAgZD0iTTMwNS43NTMsMjgxLjM3NmMwLDAtMTguODU4LTE4Ljg1Ni0yNy44NTQtMjcuODUxYzcuOTQzLTcuOTQ0LDIxLjE1Mi0yMS4xNTMsMjEuMTUyLTIxLjE1M2MxLjkxMy0xLjkxMywyLjkyOS00LjQ3MSwyLjkyOS03LjA3M2MwLTEuMjg5LTAuMjQ5LTIuNTg4LTAuNzYyLTMuODI1Yy0xLjU0OC0zLjczNi01LjE5My02LjE3My05LjIzOC02LjE3MyAgICAgbC03Ni44NjMsMGMtNS41MjMsMC0xMCw0LjQ3Ny0xMCwxMHY3Ni44NjdjMCw0LjA0NSwyLjQzNyw3LjY5MSw2LjE3Myw5LjIzOWMzLjczNywxLjU0OCw4LjAzOSwwLjY5MSwxMC44OTgtMi4xNjljMCwwLDEzLjIwOC0xMy4yMTEsMjEuMTUyLTIxLjE1NWM4Ljk5Niw4Ljk5NiwyNy44NTIsMjcuODU0LDI3Ljg1MiwyNy44NTRjMS44NzUsMS44NzYsNC40MTksMi45Myw3LjA3MSwyLjkzczUuMTk1LTEuMDU0LDcuMDcxLTIuOTI5bDIwLjQyLTIwLjQyICAgICBjMS44NzUtMS44NzYsMi45MjktNC40MTksMi45MjktNy4wNzFzLTEuMDU0LTUuMTk2LTIuOTMtNy4wNzF6Ig0KICAgICBpZD0icGF0aDU5Ig0KICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMS4zODAxOCwxLjQyOTUsLTEuNDI5NSwtMS4zODAxOCw5OTguNDc3LDI2Ni41NDcpIiAvPg0KPC9zdmc+DQo=\n'

// Wrapper styles
const style = { width: 500, height: 300 }

// Stories
addStory('initial', readme, () => (
  <ImageInput
    label='Browse files'
    style={style}
  />
))

addStory('binary', readme, () => (
  <ImageInput
    label='Browse files'
    type='binary'
    style={style}
    onChange={action('change')}
  />
))

addStory('file', readme, () => (
  <ImageInput
    label='Browse files'
    type='file'
    style={style}
    onChange={action('change')}
  />
))

addStory.controlled('url controlled', readme, (setState, state) => (
  <ImageInput
    label='Browse files'
    style={style}
    value={state.value}
    onChange={(value) => { setState({ value }) }}
  />
), () => ({ value: image }))

addStory.controlled('binary controlled', readme, (setState, state) => (
  <ImageInput
    label='Browse files'
    type='binary'
    style={style}
    value={state.value}
    onChange={(value) => { setState({ value }) }}
  />
), () => ({ value: null }))

addStory.controlled('file controlled', readme, (setState, state) => (
  <ImageInput
    label='Browse files'
    type='file'
    style={style}
    value={state.value}
    onChange={(value) => { setState({ value }) }}
  />
), () => ({ value: null }))
