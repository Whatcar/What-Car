import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../css/mainStyles';
import Car from './Car';

export default function CarRecommendation({ findMore }) {
  return (
    <RecommendWrapper>
      <MainLayout>
        <SubTitle>사진과 유사한 다른 차들이에요</SubTitle>
        <SlideBoxCase>
          <SlideBox>
            {findMore && (
              <Cars>
                {findMore.map((item) => (
                  <Car key={`detail-${item.id}`} item={item}></Car>
                ))}
              </Cars>
            )}
          </SlideBox>
        </SlideBoxCase>
      </MainLayout>
    </RecommendWrapper>
  );
}

const RecommendWrapper = styled.div`
  margin: 3rem 0;
  width: 100%;
`;

const MainLayout = styled.div`
  margin: auto;
`;

const Cars = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    width: 85%;
  }
  display: flex;
  align-items: center;
  margin: 1rem auto;
  overflow: auto;
`;

const SlideBoxCase = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const SlideBox = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;
