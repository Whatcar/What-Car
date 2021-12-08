import { Button } from '@mui/material';
import React from 'react';
import { Desc, MainTitle } from '../../css/mainStyles';
import { useNavigate } from 'react-router';
import useSrr from '../../utils/useSrr';
import { colors } from '../../css/theme';
import styled, { keyframes } from 'styled-components';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

export default function Section4({ swiper }) {
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <MainTitle {...useSrr('down', 1, 0.2)}>
        다른 사람들은{' '}
        <span style={{ color: colors.blueM, display: 'inline-block' }}> 어떤 차에 관심 있는지</span>{' '}
        궁금해요!
      </MainTitle>
      <Desc {...useSrr('down', 1, 0.5)} top={0.5}>
        사람들은 길을 가다 어떤 차에 관심을 가질까요?
        <br />
        갤러리에서 다른 사람들이 검색한 차를 보고, 내가 검색한 차량도 공유해보세요!
      </Desc>
      <Button
        variant="outlined"
        startIcon={<ChevronRightRoundedIcon />}
        sx={{ padding: '10px 3rem', marginTop: '1rem' }}
        onClick={() => navigate('/gallary')}
        {...useSrr('down', 1, 1)}
      >
        갤러리 보러 가기
      </Button>
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
        }}
      >
        <ScrollDiv
          onClick={() => {
            swiper.slideTo(0);
            window.scrollTo(0, 0, 'smooth');
          }}
        >
          <span />맨 위로 올라가기
        </ScrollDiv>
      </div>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 80%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const scroll = keyframes`
    0% {
      transform: rotate(135deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(135deg) translate(-20px, 20px);
      opacity: 0;
    }
`;

export const ScrollDiv = styled.div`
  padding-top: 1.5rem;
  position: relative;
  color: ${({ theme }) => theme.colors.blueM};
  margin: 2rem auto 0;
  text-align: center;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    margin: 1rem auto;
    padding-top: 0;
  }
  span {
    position: absolute;
    top: 0;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid ${({ theme }) => theme.colors.blueM};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blueM};
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-animation: ${scroll} 1.5s infinite;
    animation: ${scroll} 1.5s infinite;
    box-sizing: border-box;
  }
`;
