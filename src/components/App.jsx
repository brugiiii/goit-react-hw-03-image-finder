import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { AppEl } from 'App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => this.setState({ query });

  render() {
    return (
      <AppEl>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.query} />
      </AppEl>
    );
  }
}
