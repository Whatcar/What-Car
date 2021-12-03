import React from 'react';
import styled from 'styled-components';
import { SubTitle, MenuDesc, MainDesc, Desc } from '../../css/mainStyles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { blue } from '../../css/colors';
import introData from '../../data/introData';

export default function Section0() {
  return (
    <SectionWrapper>
      <SubTitle>차.알.못을 위한 자동차 검색 서비스, 왓카!</SubTitle>
      <MainDesc>이런 사람들을 위해 만들었어요</MainDesc>
      <PeopleIntro>
        {introData.map((item) => (
          <PersonIntro>
            <CheckBoxIcon sx={{ color: blue.main }} />
            <div>{item.person}</div>
            <Desc>{item.desc}</Desc>
          </PersonIntro>
        ))}
      </PeopleIntro>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const PeopleIntro = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

const PersonIntro = styled.div`
  flex: 1 1 0;
  div {
    font-size: 8rem;
    margin-top: 2rem;
  }
  @media screen and (max-width: 480px) {
    div {
      font-size: 4rem;
      margin-top: 1rem;
    }
  }
`;
