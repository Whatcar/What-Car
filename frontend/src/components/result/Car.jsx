import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Desc } from '../../css/mainStyles';
import { Button } from '@mui/material';

export default function Car({ item }) {
  const navigate = useNavigate();
  const onButtonClick = (pageId) => {
    navigate(`/result/${pageId}`);
  };
  return (
    <CarCard>
      <Percentage>{(item.similarity * 100).toFixed(2)}%</Percentage>
      <img src={item.photolink} height="50%" />
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
  transition: all 0.3s ease-in-out;
  button {
    display: none;
  }
`;

const Percentage = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  border: 1px solid black;
  line-height: 50px;
  font-size: 0.8rem;
`;
