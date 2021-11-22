import React, { useState } from 'react';
import { LinearProgress, Button } from '@mui/material';
import { blue } from '../css/colors.js';
import styled from 'styled-components';
import questions from '../data/mbtiQuestions.js';
import Questions from '../components/MBTI/Questions.jsx';

export default function MBTItest() {
  const [progress, setProgress] = useState(0);
  // TODO: 페이지네이션, 버튼 연결, 계산 로직 구현
  return (
    <>
      <ProgressBar>
        <div style={{ textAlign: 'right' }}>{progress + 1}/9</div>
        <LinearProgress variant="determinate" color="inherit" value={((progress + 1) * 100) / 9} />
      </ProgressBar>
      <Questions item={questions[progress]} progress={progress} />
      <Buttons>
        <Button variant="contained" size="large" sx={{ backgroundColor: blue.main }}>
          이전
        </Button>
        <Button variant="contained" size="large" sx={{ backgroundColor: blue.main }}>
          다음
        </Button>
      </Buttons>
    </>
  );
}

const ProgressBar = styled.div``;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  button {
    width: 200px;
    margin-top: 2rem;
  }
`;
