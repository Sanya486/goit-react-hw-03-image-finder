import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Searchbar extends Component {
//   static propTypes = {
//     prop: PropTypes
//     }
    state = {
        inputValue: ''
    }



    inputHandler = (e) => {
        this.setState({inputValue: e.target.value})
    }

    submitHander = (e) => {
        e.preventDefault();
        this.props.onSubmit(e)
        
    }

    render() {

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.submitHander}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
                    type="text"
                    name='search'
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

