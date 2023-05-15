import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonEl } from './Button.styled';

export class Button extends Component {
  render() {
    return (
      <ButtonEl type="button" onClick={this.props.onClick}>
        {this.props.children}
      </ButtonEl>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
