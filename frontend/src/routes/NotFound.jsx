import React from 'react';
import { MainTitle, Desc } from '../css/mainStyles';
import notFoundImg from '../img/notfound/notFoundImg.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { blue } from '../css/colors';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundWrapper>
      <img src={notFoundImg} width="70%" />
      <MainTitle top={2}>아무 것도 찾을 수 없어요!</MainTitle>
      <Desc>주소를 다시 확인해주세요!</Desc>
      <Button variant="contained" sx={{ backgroundColor: blue.main }} onClick={() => navigate('/')}>
        메인 페이지로 돌아가기
      </Button>
    </NotFoundWrapper>
  );
}

const NotFoundWrapper = styled.div`
  text-align: center;
`;
