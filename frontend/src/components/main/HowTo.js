import React from 'react';
import styled from 'styled-components';
import { SubTitle } from './mainStyles';
import Sub1 from '../../img/main/main_sub_1.svg';
import Sub2 from '../../img/main/main_sub_2.svg';
import Sub3 from '../../img/main/main_sub_3.svg';
import { blue, black } from '../../css/colors';
import { menu, body } from '../../css/fonts';

export default function HowTo() {
  return (
    <HowToDiv>
      <SubTitle center>어떻게 검색하나요?</SubTitle>
      <Steps>
        <div>
          <StepImg>
            <img src={Sub1} />
          </StepImg>
          <VerticalLine />
          <StepImg>
            <img src={Sub2} />
          </StepImg>
          <VerticalLine />
          <StepImg>
            <img src={Sub3} />
          </StepImg>
        </div>
        <HowToDesc>
          <HowToStep>
            <HowToTitle>step 1. 사진 찍기</HowToTitle>
            <HowToDetail>이름을 알고 싶은 자동차의 사진을 찍으세요.</HowToDetail>
            <HowToDetail>
              자동차의 절반 이상이 나와야 하며, 자동차의 크기가 이미지의 반 이상을 차지해야 합니다.
            </HowToDetail>
          </HowToStep>
          <VerticalLine no />
          <HowToStep>
            <HowToTitle>step 2. 업로드 하기</HowToTitle>
            <HowToDetail>사진을 업로드 해주세요.</HowToDetail>
            <HowToDetail>
              파일 형식은 png, jpg만 가능하며, 이미지 크기는 1mb 이하여야 합니다.
            </HowToDetail>
          </HowToStep>
          <VerticalLine no />
          <HowToStep>
            <HowToTitle>step 3. 검색하기</HowToTitle>
            <HowToDetail>이미지 검색하기 버튼을 누르세요.</HowToDetail>
            <HowToDetail>왓카가 이미지를 인식해 이름을 알려줄 거예요!</HowToDetail>
          </HowToStep>
        </HowToDesc>
      </Steps>
    </HowToDiv>
  );
}

const HowToDiv = styled.div`
  margin: 5rem auto;
  width: 90%;
`;

const Steps = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: center;
`;

const StepImg = styled.div`
  border: 2px solid ${blue.main};
  border-radius: 50%;
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60%;
  }
`;

const VerticalLine = styled.div`
  border: ${(props) => (props.no ? '' : `1px solid ${blue.main}`)};
  width: 0px;
  height: 70px;
  margin-left: 65px;
`;

const HowToDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HowToStep = styled.div`
  margin-left: 2rem;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HowToTitle = styled.p`
  ${menu};
  color: ${blue.main};
`;

const HowToDetail = styled.p`
  ${body};
  color: ${black[900]};
  line-height: 24px;
`;
