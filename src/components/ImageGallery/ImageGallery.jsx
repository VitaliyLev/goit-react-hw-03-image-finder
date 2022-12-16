import React from 'react';
import PropTypes from 'prop-types';

import { List } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return (
    <>
      <List>{children}</List>
    </>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
