import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { MainTitle, SubTitle } from '../css/mainStyles';
import { blue } from '../css/colors';
import Ranking from '../components/worldcup/Ranking';

export default function WorldcupResult() {
  const params = useParams();
  const carId = params.id;
  const [result, setResult] = useState({});
  const [rank, setRank] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/worldcup/result', { params: { id: carId } })
      .then((res) => {
        console.log(res.data);
        setResult(res.data[0]);
        setRank(res.data[1]);
      });
  }, [carId]);
  return (
    <>
      <MainTitle>
        당신의 차 이상형은
        <br />
        <span style={{ color: blue.main }}>{result.name}</span>
        <br />
        입니다!
      </MainTitle>
      <img src={result.photolink} alt="결과 이미지" />
      <SubTitle>이 차는 전체의 {result.rate}%가 선택했어요!</SubTitle>
      <Ranking ranking={rank} />
    </>
  );
}
