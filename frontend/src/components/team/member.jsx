import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../css/mainStyles';

export default function Member({ image, name, part, intro }) {
  return (
    <MemberCard>
      <MemberPicture src={image} />
      <IntroSubTitle>{name}</IntroSubTitle>
      <Part>{part}</Part>
      <Introduction>{intro}</Introduction>
    </MemberCard>
  );
}

const MemberCard = styled.div`
  width: 200px;
  position: relative;
  background-color: #ededed;
  border-radius: 20px;
  padding: 120px 10px 10px;
  margin: 60px 1rem 1rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 480px) {
    width: 120px;
    border-radius: 10px;
    padding: 60px 5px 5px;
    margin: 30px 0.5rem 0.5rem;
  }
`;

const IntroSubTitle = styled(SubTitle)`
  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MemberPicture = styled.img`
  position: absolute;
  width: 150px;
  top: -50px;
  left: 35px;
  border-radius: 50%;
  @media screen and (max-width: 480px) {
    width: 90px;
    top: -25px;
    left: 20px;
  }
`;

const Introduction = styled.p`
  margin-top: 10px;
  height: 3rem;
  overflow: auto;
  line-height: 1.5rem;
  @media screen and (max-width: 480px) {
    margin-top: 5px;
    height: 2rem;
    font-size: 0.6rem;
    line-height: 1rem;
  }
`;

const Part = styled.p`
  color: grey;
  font-size: 0.8rem;
  line-height: 1rem;
  @media screen and (max-width: 480px) {
    font-size: 0.2rem;
  }
`;
