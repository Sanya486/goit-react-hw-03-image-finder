import React from 'react'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ src, alt}) => {
  return (
    <li className="ImageGalleryItem">
          <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {

}

export default ImageGalleryItem
