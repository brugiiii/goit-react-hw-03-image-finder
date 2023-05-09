import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ButtonEl } from './Button.styled';

export class Button extends Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <ButtonEl type="button" onClick={this.handleClick}>
        {this.props.children}
      </ButtonEl>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
