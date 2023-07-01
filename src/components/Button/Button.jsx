import React from 'react'
import PropTypes from 'prop-types'
import css from './Button.module.css';

const Button = ({ onClick, scrollToBottom }) => {
  return (
    <button type="button" id="loadMoreBtn" className={css.Button} onClick={() => {
      onClick(); scrollToBottom()
    }}>
      Load More
    </button>
  );
};


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
}

export default Button
