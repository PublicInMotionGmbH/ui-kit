import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { prefix } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import FileInput from './src/FileInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('File Input', module, {
  propTables: [ FileInput ],
  propTablesExclude: [ Icon ]
})

// Helpers
const iconCls = prefix('file-input-storybook', 'icon')
const wrapperCls = prefix('file-input-storybook', 'wrapper')

const renderFile = (props) => {
  const { file, onRemove } = props
  return (
    <div className='talixo-file-input-storybook-render'>
      <div className='talixo-file-input-storybook-render__icon'>
        <Icon name={'remove_circle'} onClick={onRemove} />
      </div>
      <div className='talixo-file-input-storybook-render__details'>
        <span className='talixo-file-input-storybook-render__name'>{file.name} </span>
        <span className='talixo-file-input-storybook-render__size'> ({file.size} B) </span>
        <span className='talixo-file-input-storybook-render__type'> {file.type} </span>
      </div>
    </div>
  )
}

// Stories

addStory('initial', readme, () => (
  <FileInput />
))
addStory('with upload label', readme, () => (
  <FileInput uploadLabel={<span><Icon name='cloud_upload' /> Drop files here or </span>} />
))

addStory('with custom header', readme, () => (
  <FileInput>
    <div className={wrapperCls}>
      <div className={iconCls}><Icon name='cloud_upload' /></div>
      <div>Drop files here or<br /><br /></div>
    </div>
  </FileInput>
))

addStory('single file upload', readme, () => (
  <FileInput uploadLabel='Drop file here or ' multiple={false} />
))

addStory('drag and drop disabled', readme, () => (
  <FileInput dropDisabled>
    <div className={wrapperCls}>
      <div className={iconCls}><Icon name='cloud_upload' /></div>
      <div>Select files to upload<br /><br /></div>
    </div>
  </FileInput>
))

addStory('custom file component', readme, () => (
  <FileInput renderFile={renderFile}>
    <div className={wrapperCls}>
      <div className={iconCls}><Icon name='cloud_upload' /></div>
      <div>Select files to upload<br /><br /></div>
    </div>
  </FileInput>
))

addStory.controlled('controlled file input', readme, (setState, state) => {
  return (
    <FileInput files={state.files} onChange={files => setState({ files })}>
      <div className={wrapperCls}>
        <div className={iconCls}><Icon name='cloud_upload' /></div>
        <div>Select files to upload or<br /><br /></div>
      </div>
    </FileInput>
  )
}, () => ({ files: [] }))
