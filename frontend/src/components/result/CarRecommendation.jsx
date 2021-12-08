import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../../css/mainStyles';
import Car from './Car';

export default function CarRecommendation({ findMore }) {
  return (
    <RecommendWrapper>
      <MainLayout>
        <MainTitle blue shadow>
          사진과 유사한 다른 차들이에요
        </MainTitle>
        <SlideBox>
          {findMore && (
            <Cars>
              {findMore.map((item) => (
                <Car key={`detail-${item.id}`} item={item}></Car>
              ))}
            </Cars>
          )}
        </SlideBox>
      </MainLayout>
    </RecommendWrapper>
  );
}

const RecommendWrapper = styled.div`
  padding: 5rem 0;
  margin: 5rem 0;
  width: 100%;
`;

const MainLayout = styled.div`
  /* width: 66%; */
  margin: auto;

  @media screen and (max-width: 480px) {
    /* width: 85%; */
  }
`;

const Cars = styled.div`
  height: 300px;
  /* width: 66%; */
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    width: 85%;
  }
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 4rem auto;
`;

const SlideBox = styled.div`
  width: 100vw;
  overflow: auto;
  /* position: absolute; */
  display: flex;
`;
