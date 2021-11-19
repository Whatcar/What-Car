import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { blue } from '../../css/colors';
import { MainTitle } from '../../css/mainStyles';
import Car from './Car';

export default function CarRecommendation({ findMore }) {
  return (
    <>
      <RecommendWrapper>
        <MainTitle white shadow>
          이런 차들은 어떠신가요?
        </MainTitle>
        <Cars>
          {findMore.map((item, idx) => (
            <Car key={`detail-${idx}`} item={item}></Car>
          ))}
        </Cars>
      </RecommendWrapper>
    </>
  );
}

const RecommendWrapper = styled.div`
  background-color: ${blue.main};
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5rem 0;
  margin: 5rem 0;
  width: 100%;
  position: absolute;
  left: 0;
`;

const Cars = styled.div`
  height: 300px;
  width: 66%;
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    width: 85%;
  }
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 4rem auto;
`;
