import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';


import { Form, Header } from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    input: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Header>
          <Form onSubmit={this.handleFormSubmit}>
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              onChange={this.handleInputChange}
              name="input"
              value={this.state.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </Header>
      </>
    );
  }
}
