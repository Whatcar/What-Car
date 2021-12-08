import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Desc } from '../../css/mainStyles';
import { Button } from '@mui/material';

export default function Car({ item }) {
  const navigate = useNavigate();
  const onButtonClick = (pageId) => {
    navigate(`/search/detail/${pageId}`);
  };
  return (
    <CarCard>
      <img alt={`car-${item.name}`} src={item.photolink} height="50%" />
      <p style={{ fontFamily: 'SBAggroM' }}>{item.name}</p>
      <Desc>{item.price}</Desc>
      <Button variant="outlined" onClick={() => onButtonClick(item.id)}>
        자세히 보기
      </Button>
    </CarCard>
  );
}

const CarCard = styled.div`
  width: 200px;
  height: 240px;
  position: relative;
  margin: 5px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1rem;
  line-height: 1rem;
  @media screen and (min-width: 481px) {
    &:hover {
      width: 240px;
      height: 290px;
      font-size: 1.2rem;
      line-height: 1.2rem;
      margin: 6px;
      padding: 1.2rem;
      border-radius: 12px;
      button {
        display: block;
      }
    }
  }
  transition: all 0.3s ease-in-out;
  button {
    display: none;
  }
  @media screen and (max-width: 480px) {
    button {
      display: block;
    }
  }
`;
