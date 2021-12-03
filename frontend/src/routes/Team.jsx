import React from 'react';
import { MainTitle, SubTitle, Desc } from '../css/mainStyles';
import styled from 'styled-components';
import yeonju from '../img/team/yeonju.jpg';
import Member from '../components/team/member';
import TeamImg from '../img/team/teamImg.png';
import Layout from '../components/Layout';

export default function Team() {
  return (
    <Layout>
      <TeamWrapper>
        <MainTitle>머선러닝29</MainTitle>
        <TeamIntro>
          <img src={TeamImg} width="50%" alt="머선러닝29" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Desc>안녕하세요👋 저희는 머선러닝29팀입니다.</Desc>
            <Desc>열심히 뚝딱뚝딱 만드는 중입니다 🔨</Desc>
          </div>
        </TeamIntro>

        <MainTitle top={5}>팀원 소개</MainTitle>
        <Members>
          <Member image={yeonju} name="김나현" part="프론트엔드" intro="안녕하세유" />
          <Member image={yeonju} name="김민지" part="백엔드" intro="안녕하세유" />
          <Member image={yeonju} name="김재현" part="프론트엔드" intro="안녕하세유" />

          <Member
            image={yeonju}
            name="백승욱"
            part="팀장 백엔드 데이터분석"
            intro="해에위이요옹~~"
          />
          <Member image={yeonju} name="이정규" part="백엔드" intro="안녕하세유" />
          <Member image={yeonju} name="최연주" part="프론트엔드" intro="서비스 잘 이용해주세요~~" />
        </Members>
      </TeamWrapper>
    </Layout>
  );
}

const TeamWrapper = styled.div`
  text-align: center;
`;

const TeamIntro = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
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
