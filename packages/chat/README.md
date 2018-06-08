# Talixo Chat

UI Component which represents Chat

## How to install

Package is available as `@talixo/chat` in NPM registry, so you can use it in your project
using `npm install @talixo/chat --save` or `yarn add @talixo/chat`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `@talixo/shared: ^0.1.0`
- `@talixo/icon: ^0.2.0`

These packages are required by `@talixo/chat`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name         | Type          | Default              | Description
----------------------|---------------|:--------------------:|--------------------------------
additionalButton      | node          | n/a                  | Additional button.
addTypingUser         | func          | n/a                  | Called when the user is typing.
additionalInformation | node          | n/a                  | Information message.
className             | string        | n/a                  | Additional class name.
messages              | Messages[]    | `[]`                 | Array of messages.
messageRenderer       | func          | `message => message` | Message renderer.
name                  | string        | `'user'`             | User name.
onSubmit              | func          | n/a                  | Handler for onSubmit event.
id                    | string        | Required             | User id.
usersTyping           | UsersTyping[] | `[]`                 | Typing users.
placeholder           | string        | `'reply'`            | Reply input placeholder.
type                  | Type          | `'chat'`             | Message type.

#### Types

Type name | Enum options
----------|---------------------------------------------------
Type      | 'chat', 'comments'

### Property shapes

#### Messages

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
name          | string    | no       | n/a           | User name.
id            | string    | no       | n/a           | User id.
message       | node      | no       | n/a           | Message content.
time          | number    | no       | n/a           | Message time stamp.

#### UsersTyping

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
name          | string    | no       | n/a           | User name.
id            | string    | no       | n/a           | User id.
status        | boolean   | no       | n/a           | Typing status.

## Changelog

- **0.0.0** - initial version
