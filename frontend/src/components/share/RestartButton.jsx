import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import restart from '../../img/share/restart.png';

function RestartButton() {
  const navigate = useNavigate();
  const onRestartClick = () => {
    var url = '';
    url = window.document.location.href;
    console.log(url);
    if (url == 'http://localhost:3000/mbti/1') {
      navigate('/mbti');
    } else if (url == 'http://localhost:3000/worldcup/result') {
      navigate('/worldcup');
    } else {
      navigate('/');
    }
  };
  return (
    <RestartBtn className="restartButton" onClick={onRestartClick}>
      <Img className="restart" src={restart} height="32px" width="32px" />
      <a>다시 시작 하기</a>
    </RestartBtn>
  );
}

const RestartBtn = styled.div`
  width: 163px;
  height: 43px;
  background-color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
  border: 1px solid #d9d9d9;
  margin: auto;
`;
const Img = styled.img`
  padding-left: 12px;
  padding-right: 12px;
`;

export default RestartButton;
