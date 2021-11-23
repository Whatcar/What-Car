import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import restart from '../../img/share/restart.png';
import { blue, black } from '../../css/colors';
import { Button } from '@mui/material';

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
    <RestartBtn
      onClick={onRestartClick}
      variant="contained"
      sx={{ backgroundColor: blue.main, color: 'white' }}
    >
      <img className="restart" src={restart} height="32px" width="32px" />
      <a>다시 시작 하기</a>
    </RestartBtn>
  );
}

const RestartBtn = styled(Button)({
  width: '180px',
});

export default RestartButton;
