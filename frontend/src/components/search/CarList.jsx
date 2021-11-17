import { useEffect, useState } from 'react';
import getCarList from '../../apis/seachAPI';

import { ImageList, ImageListItem } from '@mui/material';
import CarHover from './CarHover';

const CarList = ({ filter }) => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    getCarList().then(({ data }) => {
      setCars(data);
    });
  }, []);

  const carItems = () => {
    const carItem = cars.map((item) => {
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
    return carItem;
  };

  return (
    <ImageList sx={{ width: '100%', overflow: 'visible' }} cols={4} gap={0}>
      {cars ? carItems() : <div>search...</div>}
    </ImageList>
  );
};

export default CarList;
