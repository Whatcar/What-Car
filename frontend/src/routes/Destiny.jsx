import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { SubTitle, Desc } from '../css/mainStyles';
import worldcup from '../img/mbti/worldcup.png';
import carbti from '../img/mbti/carbti.png';
import { useNavigate } from 'react-router';
import CustomHelmet from '../components/share/CustomHelmet';

export default function Destiny() {
  const navigate = useNavigate();
  return (
    <Layout>
      <CustomHelmet
        title="운명의 차 찾기 | 왓카"
        description="나와 운명인 차를 테스트로 찾아봐요!"
      />
      <Box>
        <Title>
          <span>운명의 차</span> 찾기
        </Title>
        <TestWrapper>
          <TestButton onClick={() => navigate('/worldcup/test')}>
            <Image src={worldcup} />
            <SubTitle>외관만큼은 내 이상형인 차는?</SubTitle>
            <Desc top={1}>
              가격, 연비, 연식 기준 다~ 내려놓고, <br />
              오직 외관만 보고 이상형을 찾아봐요!
            </Desc>
          </TestButton>
          <TestButton onClick={() => navigate('/mbti/test')}>
            <Image src={carbti} />
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
  width: 70%;
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
