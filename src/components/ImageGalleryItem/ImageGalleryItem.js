import React, { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;

    return (
      <>
        <Item className="gallery-item" onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {this.state.showModal && (
          <Modal url={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
