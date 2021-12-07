import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import CarRecommendation from '../components/result/CarRecommendation';
import Disqus from 'disqus-react';
import { useLocation } from 'react-router';
import Layout from '../components/Layout';
import FeedbackButton from '../components/share/FeedbackButton';
import { MainTitle } from '../css/mainStyles';

export default function Result() {
  const params = useParams();
  const { state } = useLocation();
  const carId = state;
  const id = params.id;
  const [carData, setCarData] = useState({});
  const [lessCar, setLessCar] = useState({});
  useEffect(() => {
    axios.get('http://localhost:5000/api/upload', { params: { id: id } }).then((res) => {
      setCarData({
        ...res.data['most_car']['most_car_detail'],
        similarity: res.data['most_car']['similarity'],
        most_car_url: res.data['most_car']['most_car_url'],
      });
      setLessCar(res.data['less_cars']);
    });
  }, [id]);
  const disqusShortname = 'WhatCar';
  const PATH = process.env.REACT_APP_FRONTEND_URL;
  const disqusConfig = {
    url: `${PATH}/result/${carId}`,
    identifier: carData.name,
    title: carData.name,
  };

  return (
    <Layout>
      <ResultWrapper>
        <MainTitle>
          <Blue>{(carData.similarity * 100).toFixed(0)}%</Blue>의 확률로
          <br />이 차는 <Blue>{carData.name}</Blue>입니다!
        </MainTitle>
        <ImageWrapper>
          <img src={carData['most_car_url']} />
          <img
            src={
              carData.photolink ||
              'https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_960_720.png'
            }
            width="70%"
            loading="lazy"
            alt="자동차 이미지"
          />
        </ImageWrapper>

        <CarDetail detail={carData} />
        <ShareButton
          title={`이 차는 ${carData.name}입니다.`}
          description="차를 자세히 보고 싶으신가요?"
          imgUrl={carData.photolink}
          buttonTitle="🚘 차 보러 가기 🚘"
          buttonText="다시 검색하기"
          linkTo="/"
          additionalButton={<FeedbackButton />}
        />
        {lessCar && <CarRecommendation findMore={lessCar} />}
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </ResultWrapper>
    </Layout>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 100%;
  img {
    flex: 1 1 0;
  }
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blueM};
`;
