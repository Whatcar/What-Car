import React, { useState } from 'react';
import { Button } from '@mui/material';
import { colors } from '../css/theme';
import styled from 'styled-components';
import questions from '../data/mbtiQuestions.js';
import Questions from '../components/MBTI/Questions.jsx';
import mbtiCalculator from '../utils/mbtiCalculator.js';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout.jsx';
import ProgressBar from '../components/ProgressBar';

export default function MBTItest() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState({});
  const PATH = process.env.REACT_APP_BACKEND_URL;

  const sendAndGoToResult = (mbtiResult) => {
    axios
      .patch(`${PATH}/api/mbti/result`, null, {
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
        confirmButtonColor: colors.blueM,
      });
    }
  };
  const onClickPrev = () => {
    if (progress === 0) {
      navigate('/destiny');
    }
    setProgress(progress - 1);
  };

  return (
    <Layout>
      <ProgressBar progress={((progress + 1) * 100) / 9} />
      <Questions
        item={questions[progress]}
        progress={progress}
        answer={answer}
        setAnswer={setAnswer}
      />
      <Buttons>
        <Button variant="outlined" onClick={onClickPrev} size="large">
          이전
        </Button>

        <Button
          variant="contained"
          onClick={onClickNext}
          size="large"
          disabled={!!!answer[progress]}
        >
          다음
        </Button>
      </Buttons>
    </Layout>
  );
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 200px;
    margin-top: 1rem;
    @media screen and (max-width: 480px) {
      width: 100px;
    }
  }
`;
