import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    isModalShow: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.closeOnEscape();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  closeOnEscape = () => {
    window.addEventListener('keydown', this.onKeydown);
  };

  closeOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.closeOnBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
