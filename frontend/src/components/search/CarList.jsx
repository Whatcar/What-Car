import styled from 'styled-components';
import { Grid } from '@mui/material';
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
          <Grid key={id} item sm={6} md={4} lg={3}>
            <CarBox>
              <CarImg src={photolink} alt={name} loading="lazy" />
              <CarHover hover={true} name={name} grade={car_grade} cost={price} carId={id} />
            </CarBox>
          </Grid>
        );
      });
      return carItem;
    }
  };

  return (
    <Grid container spacing={0} sx={{ marginBottom: '3rem' }}>
      {carItems()}
    </Grid>
  );
};

export default CarList;

const CarBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarImg = styled.img`
  width: 100%;
  object-fit: contain;
  padding: 8px;
  box-sizing: border-box;
`;
