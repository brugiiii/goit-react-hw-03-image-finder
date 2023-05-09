import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('[id=modal-root]');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalEl>
          <img src={url} alt={alt} />
        </ModalEl>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
