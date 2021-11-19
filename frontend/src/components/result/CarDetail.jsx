import React from 'react';
import { MainTitle } from '../../css/mainStyles';
import styled from 'styled-components';
import { blue } from '../../css/colors';

export default function CarDetail({ detail }) {
  return (
    <>
      <MainTitle>
        이 차는 <BlueText>{detail.modelName}</BlueText>입니다!
      </MainTitle>
      <CarInfo>
        <img src={detail.carImg} width="50%" />
        <CarSpec>
          {displayOrder.map((item) => (
            <div>
              <span>{item.kor}</span>
              {detail[item.eng]}
            </div>
          ))}
        </CarSpec>
      </CarInfo>
    </>
  );
}

const BlueText = styled.span`
  color: ${blue.main};
`;

const CarInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const CarSpec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  flex-grow: 1;
  margin-left: 1rem;
  span {
    font-family: 'SBAggroM';
    margin-right: 1rem;
  }
`;

const displayOrder = [
  { eng: 'modelName', kor: '모델' },
  { eng: 'modelType', kor: '외형' },
  { eng: 'modelSize', kor: '차급' },
  { eng: 'price', kor: '가격' },
  { eng: 'korean', kor: '국산/수입' },
  { eng: 'fuelType', kor: '연료' },
  { eng: 'fuelEfficiency', kor: '연비' },
  { eng: 'isSoldOut', kor: '판매여부' },
  { eng: 'capacity', kor: '승차정원' },
  { eng: 'displacement', kor: '배기량' },
  { eng: 'engineType', kor: '엔진형식' },
  { eng: 'drivingMethod', kor: '구동방식' },
];
