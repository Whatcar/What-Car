import React from 'react';
import nextToCar from '../img/nextToCar.svg';
import styled from 'styled-components';
import { MainTitle, SubTitle } from '../css/mainStyles';
import { Button } from '@mui/material';
import { blue } from '../css/colors';
import { useNavigate } from 'react-router';

export default function MBTI() {
  const navigate = useNavigate();
  return (
    <MbtiWrapper>
      <img src={nextToCar} width="300px" style={{ marginTop: '3rem' }} />
      <MainTitle top={3}>나의 운전 성향과 찰떡인 차는?</MainTitle>
      <SubTitle top={1}>운전 성향을 검사하고, 나와 어울리는 차는 무엇인지 알아봐요!</SubTitle>
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: blue.main, color: 'white', width: '300px', marginTop: '2rem' }}
        onClick={() => navigate('test')}
      >
        시작하기
      </Button>
    </MbtiWrapper>
  );
}

const MbtiWrapper = styled.div`
  text-align: center;
`;
