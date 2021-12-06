import { Button } from '@mui/material';
import React from 'react';
import { Desc, MainTitle, SubTitle } from '../../css/mainStyles';
import { useNavigate } from 'react-router';
import useSrr from '../../utils/useSrr';
import { colors } from '../../css/theme';
import styled from 'styled-components';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

export default function Section4({ swiper }) {
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <MainTitle {...useSrr('down', 1, 0.2)}>
        다른 사람들은
        <span style={{ color: colors.blueM }}> 어떤 차에 관심 있는지 </span>
        궁금해요!
      </MainTitle>
      <Desc {...useSrr('down', 1, 0.5)}>
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
        <Button
          variant="contained"
          startIcon={<ArrowUpwardRoundedIcon />}
          sx={{ padding: '10px 3rem', marginTop: '1rem' }}
          onClick={() => {
            swiper.slideTo(0);
            window.scrollTo(0, 0, 'smooth');
          }}
        >
          맨 위로 올라가기
        </Button>
      </div>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div``;
