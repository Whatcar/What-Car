import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import { useParams } from 'react-router';
import Disqus from 'disqus-react';
import Layout from '../components/Layout';
import GalleryShare from '../components/share/GalleryShare';

import getSearchDetail from '../apis/getSearchDetail';
import { MainTitle } from '../css/mainStyles';

export default function SearchDetail() {
  const params = useParams();
  const carId = params.id;
  const [carData, setCarData] = useState({});
  const [carColor, setCarColor] = useState([]);
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
    url: `${PATH}/search/detail/${carId}`,
    identifier: carData.name,
    title: carData.name,
  };

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
          width="50%"
          loading="lazy"
          alt="자동차 이미지"
        />
        <CarDetail detail={carData} colors={carColor} />
        <ShareButton
          title={`이 차는 ${carData.name}입니다.`}
          description="차를 자세히 보고 싶으신가요?"
          imgUrl={carData.photolink}
          buttonTitle="🚘 차 보러 가기 🚘"
          buttonText="목록으로 돌아가기"
          linkTo="/search"
        />
        <GalleryShare carId={carId} />
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </ResultWrapper>
    </Layout>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blueM};
`;
