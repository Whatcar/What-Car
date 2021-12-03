import React, { useState } from 'react';
import { LinearProgress, Button } from '@mui/material';
import { blue } from '../css/colors.js';
import styled from 'styled-components';
import questions from '../data/mbtiQuestions.js';
import Questions from '../components/MBTI/Questions.jsx';
import mbtiCalculator from '../utils/mbtiCalculator.js';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function MBTItest() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState({});
  const sendAndGoToResult = (mbtiResult) => {
    axios
      .patch('http://localhost:5000/api/mbti/result', null, {
        params: {
          mbti: mbtiResult,
        },
      })
      .then((res) => {
        navigate(`/mbti/result/${mbtiResult}`, { state: res.data });
      });
  };

  const onClickNext = () => {
    if (answer[progress]) {
      if (progress === 7) {
        const result = mbtiCalculator(answer);
        sendAndGoToResult(result);
      } else {
        setProgress(progress + 1);
      }
    } else {
      Swal.fire({
        title: '보기 중 하나를 선택해주세요!',
        icon: 'warning',
        confirmButtonText: '넵!',
        confirmButtonColor: blue.main,
      });
    }
  };
  const onClickPrev = () => {
    if (progress === 0) {
      navigate('/mbti');
    }
    setProgress(progress - 1);
  };
  return (
    <>
      <ProgressBar>
        <div style={{ textAlign: 'right' }}>{progress + 1}/9</div>
        <LinearProgress variant="determinate" color="inherit" value={((progress + 1) * 100) / 9} />
      </ProgressBar>
      <Questions
        item={questions[progress]}
        progress={progress}
        answer={answer}
        setAnswer={setAnswer}
      />
      <Buttons>
        <Button
          variant="contained"
          onClick={onClickPrev}
          size="large"
          sx={{ backgroundColor: blue.main }}
        >
          이전
        </Button>

        <Button
          variant="contained"
          onClick={onClickNext}
          size="large"
          sx={{ backgroundColor: answer[progress] ? blue.main : blue.dark }}
        >
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
    @media screen and (max-width: 480px) {
      width: 100px;
    }
  }
`;
