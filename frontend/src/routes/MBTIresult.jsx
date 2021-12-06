import React from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import ShareButton from '../components/share/ShareButton';
import { MainDesc, MainTitle, SubTitle } from '../css/mainStyles';
import mbtiDesc from '../data/mbtiCar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { resetSessionStorage } from '../utils/searchCondition';
import { blue } from '../css/colors';
import PieChart from '../components/MBTI/PieChart';
import Layout from '../components/Layout';
import { useSetRecoilState } from 'recoil';
import { brand } from '../recoil/atom';
import { colors } from '../css/theme';

export default function MBTIresult() {
  // TODO: 결과 상세 제작
  const navigate = useNavigate();
  const params = useParams();
  const type = params.type;
  const data = mbtiDesc[type];
  const { state } = useLocation();
  const setBrand = useSetRecoilState(brand);
  console.log(state);

  const onClickButton = () => {
    resetSessionStorage();
    sessionStorage.setItem('brand', data.brand);
    setBrand(data.brand);
    navigate('/search');
  };
  return (
    <Layout>
      <MainTitle>당신과 찰떡인 자동차 브랜드는</MainTitle>
      <MainTitle>
        <Highlight>
          {data.carDesc} {data.brand}
        </Highlight>
        입니다!
      </MainTitle>
      <Button variant="contained" size="large" onClick={onClickButton}>
        {data.brand} 차 보러 가기
      </Button>

      <ResultWrapper>
        <img
          src={data.img}
          alt={`${data.brand} 차 이미지`}
          loading="lazy"
          style={{ width: '70%' }}
        />
        <MainDesc style={{ marginBottom: '1rem' }}>
          {data.personality} 당신은 <Highlight>{data.brand}</Highlight>와 찰떡궁합이네요!
        </MainDesc>
        {state && (
          <>
            <SubTitle top={1}>
              전체 중{' '}
              <Highlight>{state && state.filter((item) => item.type === type)[0].rate}%</Highlight>
              의 사람들이 이 브랜드와 찰떡이에요!
            </SubTitle>
            <SubTitle top={4}>유형별 랭킹</SubTitle>
            <PieChart mbti={state} special={type} />
          </>
        )}
        <ShareButton url="mbti" />
      </ResultWrapper>
    </Layout>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const Highlight = styled.span`
  color: ${blue.main};
`;
