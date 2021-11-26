import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import CarRecommendation from '../components/result/CarRecommendation';
import Disqus from 'disqus-react';
import { useLocation } from 'react-router';

const mockData = [
  {
    carImg: 'https://whatcar.s3.ap-northeast-2.amazonaws.com/photo/4038.jpg',
    carName: '2022 제네시스 GV60 준중형',
    carPrice: '5,990~6,975만원',
    details: '3842',
  },
  {
    carImg: 'https://whatcar.s3.ap-northeast-2.amazonaws.com/photo/4085.jpg',
    carName: '2022 폭스바겐 티록',
    carPrice: '3,244~3,835만원',
    details: '3885',
  },
  {
    carImg: 'https://whatcar.s3.ap-northeast-2.amazonaws.com/photo/4081.jpg',
    carName: '2022 BMW X3(3세대)',
    carPrice: '6,440~9,370만원',
    details: '3881',
  },
  {
    carImg: 'https://whatcar.s3.ap-northeast-2.amazonaws.com/photo/4082.jpg',
    carName: '2022 BMW X4(2세대)',
    carPrice: '6,670~9,620만원',
    details: '3882',
  },
];

export default function Result() {
  const params = useParams();
  const { state } = useLocation();
  const carId = params.id;
  const [carData, setCarData] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/detail', { params: { id: carId } })
      .then((res) => setCarData(res.data));
  }, [carId]);

  console.log(state);

  const disqusShortname = 'WhatCar';
  const disqusConfig = {
    url: `http://localhost:3000/result/${carId}`,
    identifier: carData.name,
    title: carData.name,
  };

  return (
    <ResultWrapper>
      <CarDetail detail={carData} />
      <ShareButton url="result" />
      {state && <CarRecommendation findMore={mockData} />}
      <DisqusFrame showMore={state ? true : false}>
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </DisqusFrame>
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const DisqusFrame = styled.div`
  margin: ${(props) => (props.showMore ? '55rem 0 5rem' : '5rem 0 5rem')};
`;
