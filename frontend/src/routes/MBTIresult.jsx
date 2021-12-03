import React from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import ShareButton from '../components/share/ShareButton';
import { Desc, MainTitle, SubTitle } from '../css/mainStyles';
import mbtiDesc from '../data/mbtiCar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { resetSessionStorage } from '../utils/searchCondition';
import { blue } from '../css/colors';
import PieChart from '../components/MBTI/PieChart';
import Layout from '../components/Layout';

export default function MBTIresult() {
  // TODO: 결과 상세 제작
  const navigate = useNavigate();
  const params = useParams();
  const type = params.type;
  const data = mbtiDesc[type];
  const { state } = useLocation();
  console.log(state);

  const onClickButton = () => {
    resetSessionStorage();
    sessionStorage.setItem('brand', data.brand);
    navigate('/search');
  };
  return (
    <Layout>
      <ResultWrapper>
        <SubTitle>나와 찰떡인 차 브랜드는?</SubTitle>
        <MainTitle>
          {data.carDesc} <Highlight>{data.brand}</Highlight>
        </MainTitle>
        <img
          src={data.img}
          alt={`${data.brand} 차 이미지`}
          loading="lazy"
          style={{ width: '70%' }}
        />
        <Desc style={{ marginBottom: '1rem' }}>
          {data.personality} 당신은 {data.brand}와 찰떡궁합이네요!
        </Desc>
        {state && (
          <>
            <SubTitle top={3}>
              전체 중 {state && state.filter((item) => item.type === type)[0].rate}% 사람들이 이
              유형에 해당돼요!
            </SubTitle>
            <SubTitle top={4}>유형별 랭킹</SubTitle>
            <PieChart mbti={state} special={type} />
          </>
        )}
        <ShareButton url="mbti" />
        <Button variant="contained" onClick={onClickButton} sx={{ marginTop: '1rem' }}>
          {data.brand} 차 보러 가기
        </Button>
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
