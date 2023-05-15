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
    const { image, largeImage, alt } = this.props;

    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={image} alt={alt} />
        </Item>
        {this.state.showModal && (
          <Modal url={largeImage} alt={alt} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
