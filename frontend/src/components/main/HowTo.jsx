import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../css/mainStyles';
import Sub1 from '../../img/main/main_sub_1.svg';
import Sub2 from '../../img/main/main_sub_2.svg';
import Sub3 from '../../img/main/main_sub_3.svg';
import { blue, black } from '../../css/colors';
import { colors } from '../../css/theme';
import { menu, body } from '../../css/fonts';
import Swal from 'sweetalert2';
import example from '../../img/main/example.jpg';
import useSrr from '../../utils/useSrr';

export default function HowTo() {
  const onClickExample = () => {
    return Swal.fire({
      title: '이렇게 해주세요!',
      imageUrl: example,
      confirmButtonText: '이해했어요!',
      confirmButtonColor: colors.blueM,
    });
  };
  return (
    <HowToDiv>
      <SubTitle center>어떻게 검색하나요?</SubTitle>
      <Steps>
        <StepImgs>
          <StepImg {...useSrr('right', 2.5, 0)}>
            <img src={Sub1} />
          </StepImg>
          <VerticalLine {...useSrr('right', 2.5, 0.7)} />
          <StepImg {...useSrr('right', 2.5, 0.5)}>
            <img src={Sub2} />
          </StepImg>
          <VerticalLine {...useSrr('right', 2.5, 1.2)} />
          <StepImg {...useSrr('right', 2.5, 1)}>
            <img src={Sub3} />
          </StepImg>
        </StepImgs>
        <HowToDesc>
          <HowToStep {...useSrr('up', 2, 0.5)}>
            <HowToTitle>step 1. 사진 찍기</HowToTitle>
            <HowToDetail>이름을 알고 싶은 자동차의 사진을 찍으세요.</HowToDetail>
            <HowToDetail>
              자동차의 절반 이상이 나와야 하며, 자동차의 크기가 이미지의 반 이상을 차지해야 합니다.
            </HowToDetail>
            <HowToDetail
              onClick={onClickExample}
              style={{ color: colors.blueM, fontFamily: 'SBAggroM', cursor: 'pointer' }}
            >
              자세히 알려주세요!
            </HowToDetail>
          </HowToStep>
          <VerticalLine no />
          <HowToStep {...useSrr('up', 2, 1)}>
            <HowToTitle>step 2. 업로드 하기</HowToTitle>
            <HowToDetail>사진을 업로드 해주세요.</HowToDetail>
            <HowToDetail>
              파일 형식은 png, jpg만 가능하며, 이미지 크기는 1mb 이하여야 합니다.
            </HowToDetail>
          </HowToStep>
          <VerticalLine no />
          <HowToStep {...useSrr('up', 2, 1.5)}>
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
  width: 80%;
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
`;

const Steps = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: center;
`;

const StepImgs = styled.div`
  @media screen and (max-width: 480px) {
    display: none;
  }
  display: block;
`;

const StepImg = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.blueM};
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
  border: ${(props) => (props.no ? '' : `1px solid ${({ theme }) => theme.colors.blueM}`)};
  width: 0px;
  height: 70px;
  margin-left: 65px;
  @media screen and (max-width: 480px) {
    height: 10px;
  }
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
  color: ${({ theme }) => theme.colors.blueM};
`;

const HowToDetail = styled.p`
  ${body};
  color: ${black[900]};
  line-height: 24px;
`;
