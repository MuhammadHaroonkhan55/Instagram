import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

export default ImageComponent;

ImageComponent.prototype = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
