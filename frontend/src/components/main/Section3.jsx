import { Button } from '@mui/material';
import React from 'react';
import { Desc, MainTitle } from '../../css/mainStyles';
import { useNavigate } from 'react-router';
import useSrr from '../../utils/useSrr';
import { colors } from '../../css/theme';
import styled from 'styled-components';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function Section3() {
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <MainTitle {...useSrr('up', 1, 0.2)}>
        자동차 종류가{' '}
        <span style={{ color: colors.blueM, display: 'inline-block' }}> 너무 많아서 </span> 나에게
        맞는 차를 어떻게 찾을지 <span style={{ color: colors.blueM }}> 모르겠어요</span>
      </MainTitle>
      <Desc top={0.5} {...useSrr('up', 1, 0.5)}>
        용어도 다 알았겠다, 이제 검색만 하면 되는데 자동차가 많아도 너무 많아서 막막하기는
        마찬가지라면, <br /> 운명의 차 찾기를 통해서 나와 찰떡궁합인 차를 찾아보세요. <br />
        평소 생각한 적은 없지만 은연 중에 끌리고 있던 운명의 자동차를 만나게 될지도 몰라요!
      </Desc>
      <Button
        variant="outlined"
        startIcon={<ChevronRightRoundedIcon />}
        sx={{ padding: '10px 3rem', marginTop: '1rem' }}
        onClick={() => navigate('/destiny')}
        {...useSrr('up', 1, 1)}
      >
        운명의 자동차 만나러 가기
      </Button>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  text-align: center;
`;
