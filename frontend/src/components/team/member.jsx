import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../css/mainStyles';

export default function Member({ image, name, part, intro }) {
  return (
    <MemberCard>
      <MemberPicture src={image} />
      <SubTitle>{name}</SubTitle>
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
`;

const MemberPicture = styled.img`
  position: absolute;
  width: 150px;
  top: -50px;
  left: 35px;
  border-radius: 50%;
`;

const Introduction = styled.p`
  margin-top: 10px;
  height: 3rem;
  overflow: auto;
  line-height: 1.5rem;
`;

const Part = styled.p`
  color: grey;
  font-size: 0.8rem;
  line-height: 1rem;
`;
