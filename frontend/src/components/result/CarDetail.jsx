import React from 'react';
import { MainTitle } from '../../css/mainStyles';
import styled from 'styled-components';
import { blue } from '../../css/colors';

export default function CarDetail({ detail }) {
  return (
    <>
      <MainTitle>
        이 차는 <BlueText>{detail.name}</BlueText>입니다!
      </MainTitle>
      <CarInfo>
        <img
          src={
            detail.photolink ||
            'https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_960_720.png'
          }
          width="50%"
          loading="lazy"
          alt="자동차 이미지"
        />
        <CarSpec>
          {displayOrder
            .filter((item) => !item.cond.includes(detail[item.eng]))
            .map((item) => (
              <div key={`${item.eng}-detail`}>
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
  { cond: [''], eng: 'name', kor: '모델' },
  { cond: [''], eng: 'appearance', kor: '외형' },
  { cond: [''], eng: 'car_grade', kor: '차급' },
  { cond: ['-만원'], eng: 'price', kor: '가격' },
  { cond: [''], eng: 'imported_domestic', kor: '국산/수입' },
  { cond: ['-'], eng: 'fuel', kor: '연료' },
  { cond: ['-'], eng: 'fuel_efficiency', kor: '연비' },
  { cond: ['-등급', '0등급'], eng: 'fuel_efficiency_rating', kor: '연비 등급' },
  { cond: [''], eng: 'on_sale', kor: '판매여부' },
  { cond: [''], eng: 'ride_capacity', kor: '승차정원' },
  { cond: ['-cc'], eng: 'displacement', kor: '배기량' },
  { cond: ['-'], eng: 'engine_type', kor: '엔진형식' },
  { cond: [''], eng: 'drive_method', kor: '구동방식' },
  { cond: ['0km/h', '-km/h'], eng: 'top_speed', kor: '최고 속도' },
];
