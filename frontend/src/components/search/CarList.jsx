import { useEffect, useState } from 'react';
import { getCarList, getCarListSorted } from '../../apis/seachAPI';

import { ImageList, ImageListItem } from '@mui/material';
import CarHover from './CarHover';

const CarList = ({ filter }) => {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    getCarList().then(({ data }) => {
      setCars(data.slice(0, 16));
    });
  }, []);

  console.log(cars);

  const carItems = () => {
    const carItem = cars.map((item) => {
      const { name, photolink, price, car_id, car_grade } = item;
      console.log(name, photolink, price, car_id, car_grade);

      return (
        <ImageListItem key={car_id} sx={{ minWidth: '100px' }}>
          <img src={photolink} alt={name} loading="lazy" />
          <CarHover hover={true} name={name} grade={car_grade} cost={price} carId={car_id} />
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
