import React from 'react';
import styled from 'styled-components';
import { SubTitle, MenuDesc, MainDesc, Desc } from '../../css/mainStyles';
import { blue } from '../../css/colors';
import pic1 from '../../img/main/1.svg';
import pic2 from '../../img/main/2.svg';
import pic3 from '../../img/main/3.svg';
import pic4 from '../../img/main/4.svg';
import { menu } from '../../css/fonts';

const introData = [
  {
    id: 1,
    img: pic1,
    moreDesc: '더 자세한 설명은 여기에',
    linkTo: '/',
    buttonText: '이미지로 자동차 검색하러 가기',
    desc: '이미지만으로 자동차 이름을 알 수는 없을까요?',
  },
  {
    id: 2,
    img: pic2,
    moreDesc: '더 자세한 설명은 여기에',
    linkTo: '/search',
    buttonText: '쉽게 자동차 검색하러 가기',
    desc: '자동차 용어를 몰라서 검색하기가 어려워요!',
  },
  {
    id: 3,
    img: pic3,
    moreDesc: '더 자세한 설명은 여기에',
    linkTo: '/test',
    buttonText: '테스트로 나와 맞는 차 찾으러 가기',
    desc: '자동차 종류가 너무 많아서 나에게 맞는 차를 어떻게 찾을지 모르겠어요',
  },
  {
    id: 4,
    img: pic4,
    moreDesc: '더 자세한 설명은 여기에',
    linkTo: '/gallary',
    buttonText: '다른 사람들이 올린 차 사진 보러 가기',
    desc: '다른 사람들은 어떤 차를 좋아하는지 궁금해요!',
  },
];

export default function Section0() {
  return (
    <SectionWrapper>
      <SubTitle dark>차.알.못을 위한 자동차 검색 서비스, 왓카!</SubTitle>
      <MainDesc dark>이런 사람들을 위해 만들었어요</MainDesc>
      <PeopleIntro>
        {introData.map((item) => (
          <PersonIntro>
            <div>check!</div>
            <img src={item.img} />
            <Desc dark top={2}>
              {item.desc}
            </Desc>
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
  justify-content: space-between;
  margin-top: 3rem;
  @media screen and (max-width: 480px) {
    overflow-x: scroll;
  }
`;

const PersonIntro = styled.div`
  flex: 1 1 0;
  div {
    ${menu}
    color: ${blue.main};
    transform: rotate(-8deg);
  }
  img {
    width: 90%;
  }
  box-sizing: border-box;
  @media screen and (max-width: 480px) {
    flex: 1 0 50%;
    padding: 0 5px;
    div {
      font-size: 1rem;
      margin-top: 1rem;
    }
  }
`;
