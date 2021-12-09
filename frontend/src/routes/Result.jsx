import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import CarRecommendation from '../components/result/CarRecommendation';
import Disqus from 'disqus-react';
import Layout from '../components/Layout';
import FeedbackButton from '../components/share/FeedbackButton';
import { MainTitle } from '../css/mainStyles';
import NotFound from './NotFound';
import GalleryShare from '../components/share/GalleryShare';

export default function Result() {
  const PATH = process.env.REACT_APP_BACKEND_URL;
  const params = useParams();
  const id = params.id;
  const [carData, setCarData] = useState({});
  const [lessCar, setLessCar] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`${PATH}/api/upload`, { params: { id: id } })
      .then((res) => {
        const names = res.data['most_car']['most_car_color'].color_name;
        const urls = res.data['most_car']['most_car_color'].color_url;
        const carColor = names.map((name, idx) => {
          return {
            name,
            url: urls[idx],
          };
        });
        setCarData({
          ...res.data['most_car']['most_car_detail'],
          similarity: res.data['most_car']['similarity'],
          most_car_url: res.data['most_car']['most_car_url'],
          isUpload: res.data['most_car']['is_upload'],
          colors: carColor,
        });
        setLessCar(res.data['less_cars']);
      })
      .catch((err) => {
        if (err.response.status === 404) setNotFound(true);
      });
  }, [id, PATH]);
  const disqusShortname = 'WhatCar';
  const disqusConfig = {
    url: `${PATH}/search/detail/${carData.id}`,
    identifier: carData.name,
    title: carData.name,
  };

  return !notFound ? (
    <Layout>
      <ResultWrapper>
        <MainTitle>
          <Blue>{(carData.similarity * 100).toFixed(0)}%</Blue>의 확률로
          <br />이 차는 <Blue>{carData.name}</Blue>입니다!
        </MainTitle>
        <ImageWrapper>
          <div>
            <img alt={'most-car-img'} src={carData['most_car_url']} />
          </div>
          <div>
            <img
              src={
                carData.photolink ||
                'https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_960_720.png'
              }
              width="70%"
              loading="lazy"
              alt="자동차 이미지"
            />
          </div>
        </ImageWrapper>

        <CarDetail detail={carData} colors={carData.colors} />
        <ShareButton
          title={`이 차는 ${(carData.similarity * 100).toFixed(0)}%의 확률로 ${
            carData.name
          }입니다.`}
          description="차를 자세히 보고 싶으신가요?"
          imgUrl={carData.most_car_url}
          buttonTitle="🚘 차 보러 가기 🚘"
          buttonText="다시 검색하기"
          linkTo="/"
          additionalButton={
            <>
              <FeedbackButton
                id={id}
                carId={carData.id}
                carUrl={carData.most_car_url}
                similarity={carData.similarity}
                setCarData={setCarData}
                isUpload={carData.isUpload}
              />
            </>
          }
        />
        {lessCar && <CarRecommendation findMore={lessCar} />}
        <GalleryShare />
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </ResultWrapper>
    </Layout>
  ) : (
    <NotFound moreInfo="해당 url이 만료되었습니다." />
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 100%;
  div {
    flex: 1 0 0;
    margin: auto;
    img {
      width: 100%;
    }
  }
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blueM};
`;
