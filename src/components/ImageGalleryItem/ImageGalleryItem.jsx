import React from 'react'
import PropTypes from 'prop-types'

import css from './ImafeGalleryItem.module.css'

const ImageGalleryItem = ({ src, alt, largeImageURL, onImageClick }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => onImageClick(largeImageURL, alt)}
    >
      <img src={src} alt={alt} className={css.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem
