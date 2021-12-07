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
import Layout from '../components/Layout';
import { colors } from '../css/theme';

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
    <Layout>
      <MainTitle>당신의 차 이상형은</MainTitle>
      {!loading ? (
        <MainTitle>
          <span style={{ color: colors.blueM }}>{result.name}</span> 입니다!
        </MainTitle>
      ) : (
        <Skeleton variant="text" width="50%" height="4rem" />
      )}
      <Button variant="contained" size="large" onClick={() => navigate(`/result/${result.car_id}`)}>
        자세히 보러 가기
      </Button>
      <ResultWrapper>
        {!loading ? (
          <img src={result.photolink} width="70%" alt="결과 이미지" />
        ) : (
          <Skeleton variant="rectangular" width="40%" height="16rem" />
        )}
        <div style={{ position: 'relative' }}>
          {!loading ? (
            <SubTitle center>
              멋진 취향을 가지셨네요!
              <br />이 차는 전체의 <span style={{ color: colors.blueM }}>{result.rate}%</span>가
              선택했어요
            </SubTitle>
          ) : (
            <Skeleton height="4rem" width="50%" />
          )}
          {!loading ? <Ranking ranking={rank} /> : <Skeleton width="100%" height="30rem" />}
          <ShareButton
            title={`당신의 차 이상형은?`}
            description={`${result.name}입니다!`}
            imgUrl={result.photolink}
            buttonTitle="🚘 결과 자세히 보러가기 🚘"
            linkTo="/worldcup/test"
          />
        </div>
      </ResultWrapper>
    </Layout>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;
