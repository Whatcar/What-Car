import React from 'react';
import { MainTitle, SubTitle, Desc } from '../css/mainStyles';
import styled from 'styled-components';
import yeonju from '../img/team/yeonju.jpg';
import nahyun from '../img/team/nahyun.png';
import jaehyun from '../img/team/jaehyun.png';
import jeonggyu from '../img/team/jeonggyu.jpg';
import minji from '../img/team/minji.png';
import seungwook from '../img/team/seungwook.jpg';
import Member from '../components/team/member';
import TeamImg from '../img/team/teamImg.png';
import Layout from '../components/Layout';
import CustomHelmet from '../components/share/CustomHelmet';

export default function Team() {
  return (
    <Layout>
      <CustomHelmet title="팀 소개 | 왓카" description="머선러닝29 팀을 소개합니다!" />
      <TeamWrapper>
        <MainTitle>머선러닝29</MainTitle>
        <TeamIntro>
          <img src={TeamImg} width="40%" alt="머선러닝29" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Desc>안녕하세요👋 저희는 머선러닝29팀입니다.</Desc>
            <Desc>저희 팀원 모두 열심히 만든 서비스니 잘 이용해주세요!</Desc>
          </div>
        </TeamIntro>

        <MainTitle top={5}>팀원 소개</MainTitle>
        <Members>
          <Member
            image={nahyun}
            name="김나현"
            part="프론트엔드"
            intro="아이디어 내고 뚝딱뚝딱 만드는 걸 좋아합니다!"
          />
          <Member
            image={minji}
            name="김민지"
            part="백엔드 데이터분석"
            intro="실패와 변화를 두려워하지 않는 개발자로 진화 중입니다."
          />
          <Member
            image={jaehyun}
            name="김재현"
            part="프론트엔드"
            intro="부족하지만 열심히 하겠습니다!"
          />

          <Member
            image={seungwook}
            name="백승욱"
            part="팀장 백엔드 데이터분석"
            intro="해에위이요옹~~"
          />
          <Member
            image={jeonggyu}
            name="이정규"
            part="백엔드 AI 데이터분석"
            intro="점점 강해지는 주니어 개발자 이정규입니다~"
          />
          <Member
            image={yeonju}
            name="최연주"
            part="프론트엔드"
            intro="이것 저것 찍먹하며 많이 배우고 있는 중입니다!"
          />
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
