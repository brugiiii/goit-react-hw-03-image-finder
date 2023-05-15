import React, { Component } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { ThreeDots } from 'react-loader-spinner';

import { Api } from '../api';

import { AppEl } from './App.styled';

const api = new Api();

// idle
// pending
// resolve
// rejected

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
    showSpinner: false,
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { query, page } = this.state;
      const hasPageUpdate = page !== prevState.page;

      if (query !== prevState.query || hasPageUpdate) {
        api.query = query;
        const data = await api.fetch(page);

        if (data.length === 0) {
          throw new Error();
        }

        this.setState(({ images }) => ({
          images: hasPageUpdate && page > 1 ? [...images, ...data] : [...data],
          status: 'resolve',
          showSpinner: false,
        }));
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  loadMore = () =>
    this.setState(({ page }) => ({ page: (page += 1), showSpinner: true }));

  onSubmit = query =>
    this.setState(() => ({ query, page: 1, status: 'pending' }));

  render() {
    const { images, status, showSpinner } = this.state;

    return (
      <AppEl>
        <Searchbar onSubmit={this.onSubmit} />

        {status === 'idle' && (
          <h2 style={{ margin: '0 auto' }}>Введіть що небудь</h2>
        )}

        {status === 'pending' && (
          <ThreeDots
            color={'#3f51b5'}
            wrapperStyle={{ justifyContent: 'center' }}
          />
        )}

        {status === 'resolve' && (
          <>
            <ImageGallery images={images} />
            {showSpinner ? (
              <ThreeDots
                color={'#3f51b5'}
                wrapperStyle={{ justifyContent: 'center' }}
              />
            ) : (
              <Button onClick={this.loadMore}>Load more</Button>
            )}
          </>
        )}

        {status === 'rejected' && (
          <h2 style={{ margin: '0 auto' }}>Нічого не знайдено</h2>
        )}
      </AppEl>
    );
  }
}
