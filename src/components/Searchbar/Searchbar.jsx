import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './Searchbar.module.css'

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  inputHandler = e => {
    this.setState({ inputValue: e.target.value });
  };

  submitHander = e => {
    e.preventDefault();
    this.props.onSubmit(e);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitHander}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            value={this.state.inputValue}
            onInput={this.inputHandler}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

