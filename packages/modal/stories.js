import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { Icon } from '@talixo/icon'
import { Button } from '@talixo/button'
import { ControlGroup } from '@talixo/control-group'

import Modal from './src/Modal'
import ModalHeader from './src/ModalHeader'
import ModalFooter from './src/ModalFooter'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module, {
  propTables: [ Modal, ModalHeader ]
})

const modalRoot = document.querySelector('body')

addStory.controlled('initial', readme, (setState, state) => (
  <div>
    <button onClick={() => { setState({ open: !state.open }) }}>
      Open Modal
    </button>
    <Modal open={state.open} attachTo={modalRoot}>
      We would like to show you your own modal. Treat it well.

      <ModalFooter>
        <Button onClick={() => { setState({ open: false }) }}>
          Close Modal
        </Button>
      </ModalFooter>
    </Modal>
  </div>
), () => ({ open: false }))

addStory('with header', readme, () => (
  <Modal open attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    There is some content available
  </Modal>
), {
  inline: false
})

addStory('with header and footer', readme, () => (
  <Modal open attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('simple informational modal', readme, () => (
  <Modal open informational attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('simple informational modal with icon', readme, () => (
  <Modal open informational icon={<Icon name='error' />} attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('success informational modal', readme, () => (
  <Modal open informational type='success' icon={<Icon name='done' />} attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='success'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('error informational modal', readme, () => (
  <Modal open informational type='error' icon={<Icon name='error' />} attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='error'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('warning informational modal', readme, () => (
  <Modal open informational type='warning' icon={<Icon name='warning' />} attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory('info informational modal', readme, () => (
  <Modal open informational type='info' icon={<Icon name='info' />} attachTo={modalRoot}>
    <ModalHeader>
      Hi there, are you sure?
    </ModalHeader>

    We are not sure if you really want to destroy the world. Could you think about it once again?

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Yes</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})

addStory.controlled('controlled informational', readme, (setState, state) => (
  <div>
    <button onClick={() => { setState({ open: !state.open }) }}>
      Open Modal
    </button>

    <Modal open={state.open} informational type='error' icon={<Icon name='error' />} attachTo={modalRoot}>
      <ModalHeader>
        Hi there, are you sure?
      </ModalHeader>

      We are not sure if you really want to destroy the world. Could you think about it once again?

      <ModalFooter>
        <ControlGroup>
          <Button type='error' onClick={() => setState({ open: false })}>OK</Button>
          <Button type='link' onClick={() => setState({ open: false })}>Cancel</Button>
        </ControlGroup>
      </ModalFooter>
    </Modal>
  </div>
), () => ({ open: false }))

addStory('long content', readme, () => (
  <Modal open attachTo={modalRoot}>
    <ModalHeader>
      Terms & Conditions
    </ModalHeader>

    <p>Lorem ipsum dolor sit amet sapien sed augue. Nulla consequat nunc. Nulla euismod, quam congue ac, suscipit rutrum. In hac habitasse platea dictumst. Cum sociis natoque penatibus et lacus iaculis nec, arcu. Suspendisse egestas non, feugiat quam at augue. Nulla in faucibus vestibulum. Nunc velit et ipsum. Fusce ullamcorper eleifend magna urna eu nibh. Maecenas rhoncus. Praesent blandit vel, sapien. Proin cursus, lacus malesuada dolor. Integer condimentum convallis. Fusce venenatis vitae, bibendum risus. Nulla facilisi. Phasellus vitae massa non leo. Maecenas lacus. Aenean lacus et fringilla odio. Etiam vehicula enim vehicula libero et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum non odio. Nam lectus non metus sed molestie placerat, molestie nisl. Nulla venenatis nunc, luctus a, blandit vestibulum ac, dictum eu, rhoncus nunc, lobortis convallis, dui lectus sit amet ipsum. Nunc elementum. Mauris pretium, diam tempor magna hendrerit et, fermentum mi, eu dui ornare id, eleifend velit. Suspendisse sollicitudin. Praesent justo. Curabitur vel quam enim, ac purus. Maecenas non nunc. Nam scelerisque ligula, quis lorem. Suspendisse quis ante. Lorem ipsum aliquet in, libero. Cras egestas a, elementum euismod, massa.</p>
    <p>Donec non ligula sit amet, nibh. Fusce ligula. Proin lacus. Nunc non purus. Proin at fermentum augue. Vivamus nibh. Vestibulum consectetuer egestas, dapibus et, commodo odio. Aenean ligula porttitor interdum. Integer aliquam ac, laoreet feugiat. Cum sociis natoque penatibus et gravida non, neque. In fermentum. Aliquam sem. Nulla ac turpis egestas. Mauris nec nibh rutrum ac, laoreet viverra est a bibendum ipsum scelerisque neque tortor augue, dictum vel, accumsan rutrum, urna quis ante. Proin volutpat a, lacinia neque. In purus scelerisque viverra. Mauris ullamcorper ut, fermentum augue. Nulla eget arcu vitae ornare sollicitudin. Nulla in enim. Suspendisse turpis tellus, at ipsum. Donec faucibus turpis. Pellentesque ac risus. Morbi dui aliquam tortor. Praesent in consequat tortor. Cras orci. Vestibulum nibh. Curabitur nec erat. Fusce nulla erat ac quam congue vel, lorem. Nullam dapibus mauris sit amet, felis. Curabitur faucibus. Sed vel quam molestie quis, wisi. Donec iaculis. In mollis, purus at ante. Duis ante vitae dui lectus ut justo elit, dictum a, dolor. Donec non dui. Vivamus urna luctus eu, fringilla condimentum, urna quis diam. Proin scelerisque iaculis. In hac habitasse.</p>
    <p>Fusce urna sit amet tellus. Quisque pretium at, mattis eget, orci. Ut sodales, velit rutrum ac, euismod elit. In justo fringilla sed, quam. Proin at tortor. Sed aliquet nulla, placerat eget, aliquet id, libero. Etiam varius, quam nulla, auctor nibh, sollicitudin eu, sem. Donec elit. Pellentesque sed est pede, pulvinar scelerisque. Proin volutpat ligula turpis, rutrum ut, turpis. Nullam iaculis augue. Aenean ac nunc. Suspendisse dolor fermentum sed, ultrices posuere ante nec urna eget ipsum orci, id nulla ipsum primis in consequat et, imperdiet nunc, vitae sem. Donec at augue. Morbi porttitor, nulla ut justo. Donec ullamcorper, enim id nulla in ipsum. Donec faucibus scelerisque. Proin gravida eros mauris, interdum at, egestas dignissim, libero malesuada velit odio lobortis augue eu libero malesuada fames ac pede. Mauris ut viverra elit. Curabitur blandit iaculis, dui eget elit. Integer convallis tellus. Proin cursus a, lacinia eget, cursus tristique, sollicitudin eu, sagittis nec, dignissim massa. Donec iaculis. Nam interdum mi id diam sit amet eleifend mi, viverra vel, eros. Quisque placerat quam. Cum sociis natoque penatibus et enim. Pellentesque at fermentum quis, placerat aliquet.</p>
    <p>In pharetra. Donec congue. Nam sed elit aliquet porttitor vitae, vulputate faucibus. Ut pharetra varius. In nonummy. Sed fringilla ligula nunc, nonummy rutrum. Donec elementum leo. Phasellus ornare lorem. Cras suscipit, velit nulla quis pellentesque dolor. Suspendisse potenti. Suspendisse vel neque quis wisi. Sed nec ante. Morbi tellus enim, id ultrices ut, eleifend ac, neque. Praesent odio urna, mattis a, ligula. Sed eros. Etiam lobortis facilisis. Maecenas imperdiet faucibus, tortor in augue. Fusce nulla ut nonummy velit rutrum ligula, in massa lacinia ut, tincidunt eu, iaculis mi. Suspendisse potenti. Morbi commodo. Curabitur vel massa. Pellentesque porta est. Suspendisse sed eros. Vivamus est sem, posuere cubilia Curae, Cras ut ligula. Curabitur vitae ultrices sit amet, vestibulum nec, dictum vel, eros. Sed molestie, neque. Vestibulum ante nec augue. Sed in faucibus tempor, sapien tristique commodo. Curabitur faucibus. Sed sollicitudin turpis libero, ultricies lobortis velit. Suspendisse et felis. Phasellus vestibulum. Etiam malesuada neque ut tortor. Nulla eleifend posuere metus. Nulla faucibus condimentum sem eget dolor. Morbi sem condimentum est diam magna lorem leo, a augue ut metus eu nibh. Sed molestie, felis cursus.</p>
    <p>Donec est. Vivamus est et turpis. Duis ornare in, elementum eros ipsum, vel nibh. Sed leo ac posuere ligula sit amet dolor. Pellentesque vel ipsum primis in nulla bibendum quis, tincidunt rutrum euismod, quam volutpat quis, orci. Ut bibendum eget, eros. Mauris imperdiet purus in faucibus mollis. Cras interdum mi ligula, in massa. Donec non eros. Mauris molestie tristique interdum. Quisque urna. Nullam a nibh. Morbi ut justo a dolor. Donec commodo, volutpat odio eget gravida vitae, ligula. Pellentesque euismod at, egestas sit amet augue purus, congue sem. Donec ullamcorper et, congue arcu. Vestibulum scelerisque. Nam eget risus. Fusce tellus. Cum sociis natoque penatibus et cursus sapien. Maecenas vitae orci. Donec ipsum primis in nisl. Nullam at diam vitae lacus. In commodo est. Donec non enim est vitae pede. Pellentesque laoreet enim. Phasellus vitae facilisis enim. Duis a condimentum interdum rhoncus, dui eu lorem. Integer aliquam tortor. Morbi sem nec erat. Pellentesque scelerisque arcu. Donec lectus vestibulum vel, ornare laoreet. Nam id rutrum magna suscipit sed, suscipit dolor. Donec enim sed nunc mauris, adipiscing posuere sit amet pede. Curabitur ornare.</p>
    <p>Duis sed molestie aliquam. In nec ante. Duis vulputate tempor ac, eleifend congue. Integer euismod nonummy. Phasellus a placerat tempus, dui sed tellus dolor tellus tristique eget, scelerisque sed, vehicula viverra, egestas vitae, vulputate luctus. Maecenas felis. Nunc massa volutpat non, tristique libero quis diam. Donec urna luctus at, ornare mi libero, fringilla sed, viverra eget, lacinia eros orci at tortor. Sed aliquet mauris rhoncus libero a neque ut nibh. Morbi vitae augue. Duis non eros. Integer euismod convallis posuere. Quisque nunc. Suspendisse potenti. Suspendisse ac massa a lectus. Ut a dolor. In hac habitasse platea dictumst. Maecenas malesuada eros, dapibus aliquam. Phasellus a nisl. Nam feugiat, urna quis dolor. Morbi a ipsum. Donec sit amet elit. Proin dui ligula, semper sollicitudin. Vestibulum ligula. Sed ultricies neque nibh lacus, congue ac, mattis vel, purus. Phasellus in faucibus orci magna pharetra velit libero auctor congue nibh nulla pellentesque dui, in faucibus in, dapibus eu, tristique enim, id justo neque, fringilla mi, id augue. Nam purus. Aenean ligula quis consectetuer adipiscing justo luctus eget, neque. Etiam rutrum. In purus vitae erat. Aenean.</p>

    <ModalFooter>
      <ControlGroup>
        <Button type='primary'>Accept</Button>
        <Button type='link'>Cancel</Button>
      </ControlGroup>
    </ModalFooter>
  </Modal>
), {
  inline: false
})
