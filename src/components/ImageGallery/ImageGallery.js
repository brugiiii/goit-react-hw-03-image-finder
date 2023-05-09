import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

import { ImageGalleryItem } from '../ImageGalleryItem';
import { Api } from '../../api';
import { Button } from '../Button';

import { Gallery } from './ImageGallery.styled';

const api = new Api();

// idle
// pending
// resolved
// rejected

export class ImageGallery extends Component {
  state = {
    data: [],
    status: 'idle',
    showSpinner: false,
  };

  async componentDidUpdate(prevProps, _) {
    try {
      const prevQuery = prevProps.query;
      const nextQuery = this.props.query;

      if (prevQuery !== nextQuery) {
        this.setState({ status: 'pending' });

        api.query = nextQuery;
        const data = await api.fetch();

        this.setState({ status: 'resolved' });

        if (data.length === 0) {
          throw new Error(`Нічого не знайдено за вашим запитом`);
        }

        return this.setState({ data });
      }
    } catch (error) {
      console.log(error);

      this.setState({ status: 'rejected' });
    }
  }

  loadMore = async () => {
    try {
      this.setState({ showSpinner: true });

      const data = await api.fetch(true);
      if (data.length === 0) {
        throw new Error(`Нічого не знайдено за вашим запитом`);
      }

      this.setState(prevState => ({
        data: [...prevState.data, ...data],
        showSpinner: false,
      }));
    } catch (error) {
      console.log(error);

      this.setState({ status: 'rejected', showSpinner: false });
    }
  };

  render() {
    const { data, status, showSpinner } = this.state;

    if (status === 'idle') {
      return <h2 style={{ margin: '0 auto' }}>Введіть що небудь</h2>;
    }

    if (status === 'pending') {
      return (
        <ThreeDots
          color={'#3f51b5'}
          wrapperStyle={{ justifyContent: 'center' }}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {data.map(item => {
              const { id, webformatURL, largeImageURL, tags } = item;
              return (
                <ImageGalleryItem
                  key={id}
                  img={webformatURL}
                  largeImg={largeImageURL}
                  alt={tags}
                />
              );
            })}
          </Gallery>

          {showSpinner ? (
            <ThreeDots
              color={'#3f51b5'}
              wrapperStyle={{ justifyContent: 'center' }}
            />
          ) : (
            <Button onClick={this.loadMore}>Load more</Button>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <h2 style={{ margin: '0 auto' }}>Нічого не знайдено</h2>;
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
