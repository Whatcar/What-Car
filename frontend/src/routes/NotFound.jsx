import React from 'react';
import { MainTitle, Desc } from '../css/mainStyles';
import notFoundImg from '../img/notfound/notFoundImg.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { blue } from '../css/colors';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';

export default function NotFound({ moreInfo }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <NotFoundWrapper>
        <img src={notFoundImg} width="70%" />
        <MainTitle top={2}>아무 것도 찾을 수 없어요!</MainTitle>
        <Desc>{moreInfo || '주소를 다시 확인해주세요!'}</Desc>
        <Button
          variant="contained"
          sx={{ backgroundColor: blue.main }}
          onClick={() => navigate('/')}
        >
          메인 페이지로 돌아가기
        </Button>
      </NotFoundWrapper>
    </Layout>
  );
}

const NotFoundWrapper = styled.div`
  text-align: center;
`;
