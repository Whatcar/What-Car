import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ShareButton from '../components/share/ShareButton';
import { Desc, MainTitle, SubTitle } from '../css/mainStyles';

export default function MBTIresult() {
  // TODO: 결과 상세 제작
  const params = useParams();
  const type = params.type;
  return (
    <ResultWrapper>
      <SubTitle>나와 찰떡인 차는?</SubTitle>
      <MainTitle>{type}</MainTitle>
      <img src="" />
      <Desc>설명은 여기에</Desc>
      <ShareButton />
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;
