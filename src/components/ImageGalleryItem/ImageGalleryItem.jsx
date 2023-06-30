import React from 'react'
// import PropTypes from 'prop-types'

const ImageGalleryItem = ({ src, alt, largeImageURL, onImageClick}) => {
  return (
    <li className="ImageGalleryItem" onClick={() => onImageClick(largeImageURL, alt)}>
          <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}

// ImageGalleryItem.propTypes = {

// }

export default ImageGalleryItem
