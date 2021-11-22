import React from 'react';
import { MainTitle, SubTitle, Desc } from '../css/mainStyles';
import styled from 'styled-components';
import yeonju from '../img/team/yeonju.jpg';
import Member from '../components/team/member';

export default function Team() {
  return (
    <TeamWrapper>
      <MainTitle>머선러닝29</MainTitle>
      <Desc top={2}>안녕하세요👋 저희는 머선러닝29팀입니다.</Desc>
      <Desc>열심히 뚝딱뚝딱 만드는 중입니다 🔨</Desc>
      <MainTitle top={5}>팀원 소개</MainTitle>
      <Members>
        <Member image={yeonju} name="김나현" part="프론트엔드" intro="안녕하세유" />
        <Member image={yeonju} name="김민지" part="백엔드" intro="안녕하세유" />
        <Member image={yeonju} name="김재현" part="프론트엔드" intro="안녕하세유" />

        <Member
          image={yeonju}
          name="백승욱"
          part="바지팀장 백엔드 데이터분석"
          intro="해에위이요옹~~"
        />
        <Member image={yeonju} name="이정규" part="백엔드" intro="안녕하세유" />
        <Member image={yeonju} name="최연주" part="프론트엔드" intro="서비스 잘 이용해주세요~~" />
      </Members>
    </TeamWrapper>
  );
}

const TeamWrapper = styled.div`
  text-align: center;
`;

const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: auto;
`;
