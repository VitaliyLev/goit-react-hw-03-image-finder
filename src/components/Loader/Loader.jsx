import React from 'react';
import { LoadSpinerBox } from './Loader.styled';
import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <LoadSpinerBox>
        <Circles
          height="80"
          width="80"
          color="#303f9f"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </LoadSpinerBox>
    </>
  );
};
