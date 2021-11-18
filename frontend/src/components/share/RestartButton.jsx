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
    <div className="restartButton">
      <Button onClick={onRestartClick}>
        <img className="restart" src={restart} height="32px" width="32px" />
        다시 시작 하기
      </Button>
    </div>
  );
}

const Button = styled.button`
  width: 160px;
  background-color: #ffffff;
  font-size: 16px;
`;

export default RestartButton;
