if (typeof requestAnimationFrame === 'undefined') {
    global.requestAnimationFrame = function (callback) {
        setTimeout(callback, 0)
    };
}

const configure = require('enzyme').configure
const Adapter = require('enzyme-adapter-react-16')
const createSerializer = require('enzyme-to-json').createSerializer

configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
