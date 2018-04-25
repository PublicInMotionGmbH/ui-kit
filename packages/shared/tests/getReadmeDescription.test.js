import { getReadmeDescription } from '../story'

describe('@shared/getReadmeDescription', () => {
  it('should pass simple text', () => {
    expect(getReadmeDescription('abc')).toEqual('abc')
  })

  it('should pass simple paragraph', () => {
    expect(getReadmeDescription('<p>abc</p>')).toEqual('<p>abc</p>')
  })

  it('should cut header on beginning', () => {
    expect(getReadmeDescription('<h1>Abcdef</h1><p>abc</p>')).toEqual('<p>abc</p>')
  })

  it('should cut header on beginning (even in paragraph)', () => {
    expect(getReadmeDescription('<p><h1>Abcdef</h1></p><p>abc</p>')).toEqual('<p>abc</p>')
  })

  it('should cut first header', () => {
    expect(getReadmeDescription('<p>abc</p><h1>Blablabla</h1>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h2>Blablabla</h2>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h3>Blablabla</h3>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h4>Blablabla</h4>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h5>Blablabla</h5>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h6>Blablabla</h6>')).toEqual('<p>abc</p>')
  })

  it('should cut first header with text after', () => {
    expect(getReadmeDescription('<p>abc</p><h1>Blablabla</h1><p>jijiji</p>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h2>Blablabla</h2><p>jijiji</p>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h3>Blablabla</h3><p>jijiji</p>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h4>Blablabla</h4><p>jijiji</p>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h5>Blablabla</h5><p>jijiji</p>')).toEqual('<p>abc</p>')
    expect(getReadmeDescription('<p>abc</p><h6>Blablabla</h6><p>jijiji</p>')).toEqual('<p>abc</p>')
  })
})
