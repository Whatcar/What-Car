import React from 'react';
import styled from 'styled-components';
import { Divider, Grid, Tooltip } from '@mui/material';

export default function CarDetail({ detail, colors }) {
  const isColor = () => {
    if (colors) {
      if (colors.length && colors[0].name) {
        return true;
      }
    }
    return false;
  };

  return (
    <InfoBox key={`car-detail-${detail.name}`}>
      {isColor() && (
        <div style={{ width: '100%' }}>
          <p>색상</p>
          <Divider style={{ width: '100%', marginBottom: '1rem' }} />
          <ColorBox>
            {colors.map((color) => (
              <Tooltip key={`tooltip-color-${color.name}`} title={color.name} arrow>
                <ColorCircle
                  key={`${detail.name}-${color.name}`}
                  art={color.name}
                  src={color.url}
                />
              </Tooltip>
            ))}
          </ColorBox>
        </div>
      )}

      <div>
        <p>상세 스펙</p>
        <Divider style={{ width: '100%', marginBottom: '1rem' }} />
        <Grid container columns={8} rowSpacing={2}>
          {displayOrder
            .filter((item) => !item.cond.includes(detail[item.eng]))
            .map((item) => (
              <Grid item key={`${item.eng}-detail`} xs={8} sm={4} lg={2}>
                <Bold>{item.kor}</Bold>
                <Light>&nbsp;&nbsp;|&nbsp;&nbsp;</Light>
                {detail[item.eng]}
              </Grid>
            ))}
        </Grid>
      </div>
    </InfoBox>
  );
}

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  row-gap: 3rem;
  margin-bottom: 5rem;
  p {
    ${({ theme }) => theme.fontStyle.subTitle}
  }
`;

const ColorBox = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const ColorCircle = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`;

const Bold = styled.span`
  font-family: 'SBAggroM';
`;

const Light = styled.span`
  color: ${({ theme }) => theme.colors.black300};
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
