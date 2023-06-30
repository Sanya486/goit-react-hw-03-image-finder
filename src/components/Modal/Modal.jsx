import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }
  componentDidMount() {
    this.closeOnEscape();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = (e) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  }

    closeOnEscape = () => {
      if (this.props.isModalShow) {
        window.addEventListener('keydown', this.onKeydown);
      }
    };

    closeOnBackdrop = (e) => {
      if (e.target === e.currentTarget) {
        this.props.onCloseModal()
      }
    }

    render() {
      return createPortal(
        <div
          className="Overlay"
          onClick={this.closeOnBackdrop}
        >
          <div className="Modal">
            <img src={this.props.src} alt={this.props.alt} />
          </div>
        </div>,
        modalRoot
      );
    }
  }

