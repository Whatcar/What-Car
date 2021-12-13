import React from 'react';
import { MainTitle, Desc } from '../css/mainStyles';
import notFoundImg from '../img/notfound/notFoundImg.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';
import { colors } from '../css/theme';
import CustomHelmet from '../components/share/CustomHelmet';

export default function NotFound({ moreInfo }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <CustomHelmet title="페이지를 찾을 수 없어요!" description="URL을 다시 한 번 확인해주세요!" />
      <NotFoundWrapper>
        <img alt={'not-found'} src={notFoundImg} width="70%" />
        <MainTitle top={2}>아무 것도 찾을 수 없어요!</MainTitle>
        <Desc>{moreInfo || '주소를 다시 확인해주세요!'}</Desc>
        <Button variant="contained" sx={{ backgroundColor: colors }} onClick={() => navigate('/')}>
          메인 페이지로 돌아가기
        </Button>
      </NotFoundWrapper>
    </Layout>
  );
}

const NotFoundWrapper = styled.div`
  text-align: center;
`;
