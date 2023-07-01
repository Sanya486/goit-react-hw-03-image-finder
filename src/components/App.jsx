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

  
  
  onSubmit = async e => {
    try {
      const query = e.target.elements.search.value;

      if (query !== '') {
        await this.setState({
          page: 1,
          isLoaderShow: true,
          searchResults: null,
        });

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
      }
      else {
        Notify.info("Please write what you whant to find")
        return
      }
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

      if (response.hits.length === 0) {
        this.setState({ isLoadMoreEnable: false });
        Notify.info('That`s all we have for your request 🙂', {
          position: 'center-bottom',
          clickToClose: true,
          fontSize: '20px',
          width: '600px'
        });
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
