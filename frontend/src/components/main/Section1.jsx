import { Button } from '@mui/material';
import React from 'react';
import { Desc, MainTitle } from '../../css/mainStyles';
import { colors } from '../../css/theme';
import useSrr from '../../utils/useSrr';
import pic1 from '../../img/main/1_1.svg';
import styled from 'styled-components';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function Section1({ swiper }) {
  return (
    <SectionWrapper>
      <img src={pic1} {...useSrr('up', 1, 0.2)} alt="메인 이미지" />
      <MainTitle {...useSrr('up', 1, 0.5)} style={{ width: '80%' }}>
        <span style={{ color: colors.blueM }}>사진만으로</span> 자동차 이름을{' '}
        <span style={{ display: 'inline-block' }}>알 수는</span> 없을까요?
      </MainTitle>
      <Desc {...useSrr('up', 1, 1)} top={0.5}>
        왓카는 20개 이상의 브랜드, 약 200종 이상의 자동차 모델을 인공지능에 학습시켜 다양한 자동차를
        인식할 수 있는 서비스를 제공합니다. 왓카에서 쉽게 사진으로 자동차를 검색하세요!
      </Desc>
      <Button
        variant="outlined"
        startIcon={<ChevronRightRoundedIcon />}
        sx={{ padding: '10px 3rem', marginTop: '1rem' }}
        onClick={() => {
          swiper.slideTo(0);
        }}
        {...useSrr('up', 1, 1.5)}
      >
        이미지로 자동차 검색하러 가기
      </Button>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 80%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
