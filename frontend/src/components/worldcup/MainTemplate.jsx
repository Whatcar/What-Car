import React from 'react';
import nextToCar from '../../img/mbti/nextToCar.svg';
import blackCar from '../../img/mbti/blackCar.svg';
import styled from 'styled-components';
import { MainTitle, SubTitle } from '../../css/mainStyles';
import { Button } from '@mui/material';
import { blue } from '../../css/colors';
import { useNavigate } from 'react-router';

export default function MainTemplate({ mainDesc, subDesc, linkTo, page }) {
  const navigate = useNavigate();
  return (
    <TemplateWrapper>
      <Image src={page === 'mbti' ? nextToCar : blackCar} />
      <MainTitle top={3}>{mainDesc}</MainTitle>
      <SubTitle top={1}>{subDesc}</SubTitle>
      <Button
        variant="contained"
        size="large"
        sx={{ backgroundColor: blue.main, color: 'white', width: '300px', marginTop: '2rem' }}
        onClick={() => navigate(linkTo)}
      >
        시작하기
      </Button>
    </TemplateWrapper>
  );
}

const TemplateWrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
  margin-top: 3rem;
  width: 300px;
  @media screen and (max-width: 480px) {
    width: 50%;
  }
`;
