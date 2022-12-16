import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <>
      <Btn type="button" onClick={onClick}>
        Load more
      </Btn>
    </>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
