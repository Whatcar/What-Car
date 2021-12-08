import styled from 'styled-components';
import { Grid } from '@mui/material';
import CarHover from './CarHover';
import person3 from '../../img/main/person3.png';

const CarList = ({ items }) => {
  const carItems = () => {
    if (!items.length) {
      return (
        <NoResultBox>
          <img
            alt={'search-not-found'}
            src={person3}
            style={{ height: '20vh', padding: '1rem 0' }}
          />
          <p>앗! 조건에 맞는 검색 결과가 없어요</p>
        </NoResultBox>
      );
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
  width: 100%;
  height: 100%;
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

const NoResultBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  color: ${({ theme }) => theme.colors.blueM};
  ${({ theme }) => theme.fontStyle.menu};
`;
