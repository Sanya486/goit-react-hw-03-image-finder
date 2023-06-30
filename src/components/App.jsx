import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Blocks } from 'react-loader-spinner';

import { fetchImages } from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Placeholder from './Placeholder/Placeholder';

const html = document.querySelector('html')



export default class App extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }


  state = {
    page: 1,
    searchResults: null,
    isLoadMoreEnable: false,
    isModalShow: false,
    isLoaderShow: false,
  };

  onSubmit = async e => {
    try {
      const query = e.target.elements.search.value;

      await this.setState({ page: 1, isLoaderShow: true, searchResults: null });

      const response = await fetchImages(query, this.state.page);

      this.setState({
        searchResults: response.hits,
        query,
        isLoadMoreEnable: true,
        largeImage: {
          src: '',
          alt: '',
        },
        isLoaderShow: false,
      });
    } catch (error) {
      console.log(error.message)
    }
  };

  onLoadMore = async () => {
    try {
      await this.setState(prevState => {
        return {
          page: prevState.page + 1,
          isLoaderShow: true,
        };
      });

      const response = await fetchImages(this.state.query, this.state.page);

      this.setState(prevState => {
        return {
          searchResults: [...prevState.searchResults, ...response.hits],
          isLoaderShow:false
        };
      });

      if (this.state.page === 42) {
        this.setState({ isLoadMoreEnable: false });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onImageClick = (src, alt) => {
    this.setState({
      isModalShow: true,
      largeImage: {
        src,
        alt,
      },
    });
    html.style.overflow = 'hidden';
  };

  onCloseModal = () => {
    this.setState({ isModalShow: false })
    html.style.overflow = 'auto';
  }

  render() {
    const { searchResults, isLoadMoreEnable, isModalShow, largeImage } =
      this.state;
    const {onSubmit, onImageClick, onLoadMore, onCloseModal} = this

    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <Placeholder/>
        {searchResults && (
          <ImageGallery
            searchResults={searchResults}
            onImageClick={onImageClick}
          />
        )}
        {this.state.isLoaderShow && (
          <Blocks color="blue" wrapperClass="Loader" />
        )}
        {searchResults && isLoadMoreEnable && <Button onClick={onLoadMore} />}
        {isModalShow && (
          <Modal
            src={largeImage.src}
            alt={largeImage.alt}
            onCloseModal={onCloseModal}
            isModalShow={isModalShow}
          />
        )}
      </div>
    );
  }
}
