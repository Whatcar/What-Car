import { Button } from '@mui/material';
import React from 'react';
import { Desc, MainTitle, SubTitle } from '../../css/mainStyles';
import { useNavigate } from 'react-router';
import useSrr from '../../utils/useSrr';
import { blue } from '../../css/colors';
import { colors } from '../../css/theme';
import styled from 'styled-components';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function Section2() {
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <MainTitle {...useSrr('down', 1, 0.2)}>
        <span style={{ color: colors.blueM }}>자동차 용어를 몰라서</span>
        <br />
        검색하기가 어려워요!
      </MainTitle>
      <Desc {...useSrr('down', 1, 0.5)} top={0.5}>
        SUV, 세단, 해치백, FF, AWD... 어디선가 들어봤지만 무슨 뜻인지 알 수 없는 용어들로 인해
        검색이 어렵지는 않았나요? <br />
        왓카가 알려주는 설명을 보며 나에게 꼭 필요한 차를 검색해보세요!
      </Desc>
      <Button
        variant="outlined"
        startIcon={<ChevronRightRoundedIcon />}
        sx={{ padding: '10px 3rem', marginTop: '1rem' }}
        onClick={() => navigate('/search')}
        {...useSrr('down', 1, 1)}
      >
        조건으로 자동차 검색하러 가기
      </Button>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  text-align: right;
  width: 50%;
  margin-left: 50%;
  @media screen and (max-width: 480px) {
    width: 100%;
    margin: 0;
  }
`;
