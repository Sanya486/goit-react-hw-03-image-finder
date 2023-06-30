import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchImages } from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';


export default class App extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    page: 1,
    searchResults: null,
    isLoadMoreEnable: false,
  };

  onSubmit = async e => {
    const query = e.target.elements.search.value;

    await this.setState({ page: 1 })
    
    const response = await fetchImages(query, this.state.page);

    this.setState({
      searchResults: response.hits,
      query,
      isLoadMoreEnable: true,
    });
  };

  onLoadMore = async () => {
    try {
      await this.setState(prevState => {
        return {
          page: prevState.page + 1,
        };
      });

      const response = await fetchImages(this.state.query, this.state.page)

      this.setState(prevState => {
        return {
          searchResults: [...prevState.searchResults, ...response.hits],
        };
      });
      
    if (this.state.page === 42) {
        this.setState({ isLoadMoreEnable: false });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const { searchResults, isLoadMoreEnable } = this.state
    
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {searchResults && (
          <ImageGallery searchResults={searchResults} />
        )}
        {searchResults && isLoadMoreEnable && (
          <Button onClick={this.onLoadMore} />
        )}
      </div>
    );
  }
}
