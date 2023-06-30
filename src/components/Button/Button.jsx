import React from 'react'
import PropTypes from 'prop-types'

const Button = ({onClick}) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load More
    </button>
  );
}


Button.propTypes = {

}

export default Button
