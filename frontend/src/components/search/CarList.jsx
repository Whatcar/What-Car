import { useEffect, useState } from 'react';
import { getCarList, getCarListSorted } from '../../apis/seachAPI';

import { ImageList, ImageListItem } from '@mui/material';
import CarHover from './CarHover';

const CarList = ({ items }) => {
  const carItems = () => {
    if (!items) {
      return <div>검색중...</div>;
    } else if (items === 'no result') {
      return <div>검색 결과가 없습니다.</div>;
    } else {
      const carItem = items.map((item) => {
        const { name, photolink, price, id, car_grade } = item;

        return (
          <ImageListItem key={id} sx={{ minWidth: '100px' }}>
            <img src={photolink} alt={name} loading="lazy" />
            <CarHover hover={true} name={name} grade={car_grade} cost={price} carId={id} />
          </ImageListItem>
        );
      });
      return carItem;
    }
  };

  return (
    <ImageList sx={{ width: '100%', overflow: 'visible' }} cols={4} gap={0}>
      {carItems()}
    </ImageList>
  );
};

export default CarList;
