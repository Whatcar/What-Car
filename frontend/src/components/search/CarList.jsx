import { useEffect, useState } from 'react';
import getCarList from '../../apis/seachAPI';
import styled from 'styled-components';

import { ImageList, ImageListItem } from '@mui/material';
import CarHover from './CarHover';

const CarList = () => {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    getCarList().then(({ data }) => {
      setCars(data);
    });
  }, []);

  let carItems = null;
  if (cars) {
    console.log(typeof cars, cars);
    carItems = cars.map((item) => {
      const name = item.modelName;
      const grade = item.modelSize;
      const cost = item.price;
      const img = item.carImg;
      const carId = item.detail;

      return (
        <ImageListItem key={carId} sx={{ minWidth: '100px' }}>
          <img src={img} alt={name} loading="lazy" />
          <CarHover hover={true} name={name} grade={grade} cost={cost} carId={carId} />
        </ImageListItem>
      );
    });
  }

  return (
    <ImageList sx={{ width: '100%', overflow: 'visible' }} cols={3} gap={0}>
      {carItems}
    </ImageList>
  );
};

export default CarList;
