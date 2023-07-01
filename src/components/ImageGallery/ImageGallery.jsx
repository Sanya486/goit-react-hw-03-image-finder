import React from 'react'
import PropTypes from 'prop-types'
import css from './ImageGallery.module.css'

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({searchResults, onImageClick}) => {
  return (
    <ul className={css.ImageGallery}>
      {searchResults.map(result => (
        <ImageGalleryItem
          src={result.webformatURL}
          alt={result.tags}
          largeImageURL ={result.largeImageURL}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  searchResults: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery
