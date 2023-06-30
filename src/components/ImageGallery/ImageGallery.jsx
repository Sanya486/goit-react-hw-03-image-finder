import React from 'react'
import PropTypes from 'prop-types'

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({searchResults}) => {
  return (
    <ul className="ImageGallery">
      {searchResults.map(result => (
        <ImageGalleryItem src={result.webformatURL} alt={result.tags} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {

}

export default ImageGallery
