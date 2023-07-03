import React, { Component } from 'react';

import { Notify } from 'notiflix';
import Loader from './Loader/Loader';
import { animateScroll as scroll } from 'react-scroll';

import css from './App.module.css'

import { fetchImages } from 'api/api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Placeholder from './Placeholder/Placeholder';

const html = document.querySelector('html')



export default class App extends Component {



  state = {
    query:'',
    page: 1,
    searchResults: null,
    isLoadMoreEnable: false,
    isModalShow: false,
    isLoaderShow: false,
  };
  
  scrollToBottom = () => {
    scroll.scrollMore(window.outerHeight - 290, {
     smooth: true,
     delay: 100,
   });

  }

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.setState({ isLoaderShow: true });
      const response = await fetchImages(this.state.query, this.state.page)
      if (response.hits.length === 0) {
        Notify.warning('Oops. Sorry, but there isn`t anything for this request! Try to find something different!')
        this.setState({ isLoadMoreEnable: false});
      }
      else {
        this.setState(prevState => {
          return {
            searchResults: [...prevState.searchResults, ...response.hits],
            isLoadMoreEnable: true,
          };
        });
      }
      this.setState({ isLoaderShow: false});
    }
  }
  
  onSubmit = e => {
    const query = e.target.elements.search.value;
    if (this.state.query === query) {
      return Notify.warning(`You are already watching ${query}`)
    }
    this.setState({
      query: query.toLowerCase(),
      isLoadMoreEnable: false,
      searchResults: [],
      page: 1,
    })
  };

  onLoadMore = () => {
    this.setState(prevState => ({
     page: prevState.page + 1,
   }))
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
    const {onSubmit, onImageClick, onLoadMore, onCloseModal, scrollToBottom} = this

    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        <Placeholder />
        {searchResults && (
          <ImageGallery
            searchResults={searchResults}
            onImageClick={onImageClick}
          />
        )}
        {this.state.isLoaderShow && (
          <Loader/>
        )}
        {searchResults && isLoadMoreEnable && (
          <Button onClick={onLoadMore} scrollToBottom={scrollToBottom} />
        )}
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
