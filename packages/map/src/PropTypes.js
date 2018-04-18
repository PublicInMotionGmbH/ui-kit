import PropTypes from 'prop-types'

export const Location = PropTypes.shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
})
