import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';

import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { img, largeImg, alt } = this.props;

    return (
      <>
        <Item className="gallery-item" onClick={this.toggleModal}>
          <Image src={img} alt={alt} />
        </Item>
        {this.state.showModal && (
          <Modal url={largeImg} alt={alt} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
