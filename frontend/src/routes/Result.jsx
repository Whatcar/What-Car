import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import CarRecommendation from '../components/result/CarRecommendation';
import Disqus from 'disqus-react';
import { useLocation } from 'react-router';
import Feedback from '../components/result/Feedback';
import Layout from '../components/Layout';
import KakaoShare from '../components/share/KakaoShare';
import FeedbackButton from '../components/share/FeedbackButton';
import getSearchDetail from '../apis/getSearchDetail';
import { MainTitle } from '../css/mainStyles';

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
  const [carColor, setCarColor] = useState([]);
  const [isFeedback, setIsFeedback] = useState(false);
  useEffect(() => {
    const getCarInfo = async (carId) => {
      const { carData, carColor } = await getSearchDetail(carId);
      setCarData(carData);
      setCarColor(carColor);
    };
    getCarInfo(carId);
  }, [carId]);

  const disqusShortname = 'WhatCar';
  const PATH = process.env.REACT_APP_FRONTEND_URL;
  const disqusConfig = {
    url: `${PATH}/result/${carId}`,
    identifier: carData.name,
    title: carData.name,
  };
  console.log(disqusConfig);

  return (
    <Layout>
      <ResultWrapper>
        <MainTitle>
          이 차는 <Blue>{carData.name}</Blue>입니다!
        </MainTitle>
        <img
          src={
            carData.photolink ||
            'https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_960_720.png'
          }
          width="70%"
          loading="lazy"
          alt="자동차 이미지"
        />
        <CarDetail detail={carData} colors={carColor} />
        <ShareButton
          title={`이 차는 ${carData.name}입니다.`}
          description="차를 자세히 보고 싶으신가요?"
          imgUrl={carData.photolink}
          buttonTitle="보러 가기"
          linkTo="/"
          additionalButton={<FeedbackButton />}
        />
        {!isFeedback && <Feedback setIsFeedback={setIsFeedback} />}
        {state && <CarRecommendation findMore={mockData} />}
        <DisqusFrame showMore={state ? true : false}>
          <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </DisqusFrame>
      </ResultWrapper>
    </Layout>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const DisqusFrame = styled.div`
  margin: ${(props) => (props.showMore ? '55rem 0 5rem' : '5rem 0 5rem')};
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blueM};
`;
