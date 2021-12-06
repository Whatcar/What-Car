import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { MainDesc, SubTitle, Desc } from '../css/mainStyles';
import nextToCar from '../img/mbti/nextToCar.svg';
import blackCar from '../img/mbti/blackCar.svg';
import { useNavigate } from 'react-router';

export default function Destiny() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Box>
        <Title>
          <span>운명의 차</span> 찾기
        </Title>
        <TestWrapper>
          <TestButton onClick={() => navigate('/worldcup/test')}>
            <Image src={nextToCar} />
            <SubTitle>외관만큼은 내 이상형인 차는?</SubTitle>
            <Desc top={1}>
              가격, 연비, 연식 기준 다~ 내려놓고, <br />
              오직 외관만 보고 이상형을 찾아봐요!
            </Desc>
          </TestButton>
          <TestButton onClick={() => navigate('/mbti/test')}>
            <Image src={blackCar} />
            <SubTitle>나의 운전 성향과 찰떡인 차는?</SubTitle>
            <Desc top={1}>
              운전 성향을 검사하고, <br />
              나와 어울리는 차가 무엇인지 알아봐요!
            </Desc>
          </TestButton>
        </TestWrapper>
      </Box>
    </Layout>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TestWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const TestButton = styled.div`
  width: 50%;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.black300};
  border-radius: 15px;
  padding: 3rem;
  box-sizing: border-box;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  margin-bottom: 1rem;
  width: 80%;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fontStyle.mainTitle}
  margin-bottom: 1rem;
  span {
    color: ${({ theme }) => theme.colors.blueM};
  }
`;
