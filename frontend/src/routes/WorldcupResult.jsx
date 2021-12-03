import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { MainTitle, SubTitle } from '../css/mainStyles';
import { blue } from '../css/colors';
import Ranking from '../components/worldcup/Ranking';
import { Skeleton, Button } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import ShareButton from '../components/share/ShareButton';

export default function WorldcupResult() {
  const params = useParams();
  const carId = params.id;
  const [result, setResult] = useState({});
  const [rank, setRank] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/worldcup/result', { params: { id: carId } })
      .then((res) => {
        console.log(res.data);
        setResult(res.data[0]);
        setRank(res.data[1].slice(0, 3));
      });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, [carId]);
  return (
    <>
      <MainTitle>당신의 차 이상형은</MainTitle>
      {!loading ? (
        <MainTitle style={{ color: blue.main }}>{result.name}</MainTitle>
      ) : (
        <Skeleton variant="text" width="50%" height="4rem" />
      )}

      <MainTitle>입니다!</MainTitle>
      <Button variant="contained" size="large" onClick={() => navigate(`/result/${result.car_id}`)}>
        자세히 보러 가기
      </Button>
      <ImgDiv>
        {!loading ? (
          <img
            src={result.photolink}
            width="60%"
            alt="결과 이미지"
            style={{ position: 'absolute', right: 0, bottom: 0 }}
          />
        ) : (
          <Skeleton variant="rectangular" width="40%" height="16rem" />
        )}
      </ImgDiv>
      {!loading ? (
        <SubTitle center>이 차는 전체의 {result.rate}%가 선택했어요!</SubTitle>
      ) : (
        <Skeleton height="4rem" width="50%" />
      )}
      <SubTitle top="6" center>
        이상형 월드컵 랭킹
      </SubTitle>
      {!loading ? <Ranking ranking={rank} /> : <Skeleton width="100%" height="30rem" />}
      <ShareButton url="worldcup" />
    </>
  );
}

const ImgDiv = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  @media screen and (max-width: 480px) {
    height: 30vh;
    img {
      width: 100%;
    }
  }
`;
