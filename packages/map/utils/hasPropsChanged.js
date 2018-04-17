import _ from 'lodash'

/**
 * Check if Directions props has changed
 *
 * @param {object} props
 * @param {object|{ lat: number, lng: number }} props.startPoint
 * @param {object|{ lat: number, lng: number }} props.endPoint
 * @param {object[]|Array<{ lat: number, lng: number }>} [props.via]
 *
 * @param {object} nextProps
 * @param {object|{ lat: number, lng: number }} nextProps.startPoint
 * @param {object|{ lat: number, lng: number }} nextProps.endPoint
 * @param {object[]|Array<{ lat: number, lng: number }>} [nextProps.via]
 *
 * @returns {boolean}
 */
function hasPropsChanged (props, nextProps) {
  return (
    !_.isEqual(props.startPoint, nextProps.startPoint) ||
    !_.isEqual(props.endPoint, nextProps.endPoint) ||
    !_.isEqual(props.via || [], nextProps.via || [])
  )
}

export default hasPropsChanged
