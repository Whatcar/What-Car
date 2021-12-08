import React from 'react';
import styled from 'styled-components';
import Sub1 from '../../img/main/main_sub_1.svg';
import Sub2 from '../../img/main/main_sub_2.svg';
import Sub3 from '../../img/main/main_sub_3.svg';
import examplegood from '../../img/main/examplegood.png';
import examplebad from '../../img/main/examplebad.png';

export default function HowTo() {
  return (
    <Steps>
      <StepImgs>
        <StepImg>
          <img src={Sub1} />
        </StepImg>
        <VerticalLine sample />
        <StepImg>
          <img src={Sub2} />
        </StepImg>
        <VerticalLine />
        <StepImg>
          <img src={Sub3} height="150px" />
        </StepImg>
      </StepImgs>
      <HowToDesc>
        <HowToStep>
          <HowToTitle>step 1. 사진 찍기</HowToTitle>
          <HowToDetail>
            이름을 알고 싶은 자동차의 사진을 찍으세요.
            <br />
            자동차의 절반 이상이 나와야 하며, 자동차의 크기가 이미지의 반 이상을 차지해야 합니다.
            아래 예시를 참고해주세요!
          </HowToDetail>
          <HowToDetail>
            <span>
              <span>좋아요!</span> 자동차 전체의 이미지가 뚜렷하게 나왔네요!
            </span>
            <SampleImg src={examplegood} />
            <span>
              <span>아쉬워요!</span> 자동차가 너무 작거나 잘려있어 검색이 어려워요
            </span>
            <SampleImg src={examplebad} />
          </HowToDetail>
        </HowToStep>
        <HowToStep>
          <HowToTitle>step 2. 업로드 하기</HowToTitle>
          <HowToDetail>
            사진을 업로드 해주세요.
            <br /> 파일 형식은 png, jpg만 가능하며, 이미지 크기는 1mb 이하여야 합니다.
          </HowToDetail>
        </HowToStep>
        {/* <VerticalLine no /> */}
        <HowToStep>
          <HowToTitle>step 3. 검색하기</HowToTitle>
          <HowToDetail>
            이미지 검색하기 버튼을 누르세요.
            <br /> 왓카가 이미지를 인식해 이름을 알려줄 거예요!
          </HowToDetail>
        </HowToStep>
      </HowToDesc>
    </Steps>
  );
}

const Steps = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  column-gap: 2rem;
  margin: 0 2rem;
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    margin: 0;
    align-content: center;
  }
`;

const StepImgs = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StepImg = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.blueM};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
  }
`;

const SampleImg = styled.img`
  display: block;
  width: 100%;
  margin: 0.125rem 0 0.5rem;
`;

const VerticalLine = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.blueM};
  width: 0px;
  margin: 0 auto;
  height: ${(props) => (props.sample ? '348px' : '10px')};
`;

const HowToDesc = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HowToStep = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const HowToTitle = styled.p`
  ${({ theme }) => theme.fontStyle.body};
  font-family: 'SBAggroM';
  color: ${({ theme }) => theme.colors.blueM};
`;

const HowToDetail = styled.p`
  ${({ theme }) => theme.fontStyle.desc};
  padding-top: 0.5rem;
  span {
    color: ${({ theme }) => theme.colors.blueM};
    span {
      font-family: 'SBAggroM';
    }
  }
`;
