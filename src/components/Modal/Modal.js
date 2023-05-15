import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalEl } from './Modal.styled';

const root = document.querySelector('[id=modal-root]');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.onBackdrop}>
        <ModalEl>
          <img src={url} alt={alt} />
        </ModalEl>
      </Overlay>,
      root
    );
  }
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
