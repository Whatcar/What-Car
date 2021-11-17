import { blue } from '../../css/colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Desc, SubTitle } from '../../css/mainStyles';
import campingCar from '../../img/mbti/campingCar.svg';

export default function Questions({ item, progress }) {
  const [click, setClick] = useState(null);
  const handleClick = (num) => {
    setClick(num);
  };
  return (
    <QnA>
      <SubTitle top={3}>
        Q{progress + 1}. {item.q}
      </SubTitle>
      <Answers>
        <Answer clicked={click === 1} onClick={() => handleClick(1)}>
          <img src={campingCar} style={{ marginTop: '2rem' }} />
          <Desc top={3}>{item.a.a1.a}</Desc>
        </Answer>
        <Answer clicked={click === 2} onClick={() => handleClick(2)}>
          <img src={campingCar} style={{ marginTop: '2rem' }} />
          <Desc top={3}>{item.a.a2.a}</Desc>
        </Answer>
        {item.a.a3.a && (
          <Answer clicked={click === 3} onClick={() => handleClick(3)}>
            <img src={campingCar} style={{ marginTop: '2rem' }} />
            <Desc top={3}>{item.a.a3.a}</Desc>
          </Answer>
        )}
      </Answers>
    </QnA>
  );
}

const QnA = styled.div`
  text-align: center;
`;

const Answers = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Answer = styled.div`
  border-radius: 50px;
  background-color: rgba(196, 196, 196, 0.1);
  flex-grow: 1;
  min-height: 300px;
  padding: 2rem;
  margin: 1rem;
  width: 50%;
  cursor: pointer;
  border: ${(props) =>
    props.clicked ? `5px solid ${blue.main}` : '5px solid rgba(196, 196, 196, 0.1)'};
  transition: border 0.5s ease;
`;
