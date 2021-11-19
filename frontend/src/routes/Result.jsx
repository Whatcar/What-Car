import React, { useState, useEffect } from 'react';
import ShareButton from '../components/share/ShareButton';
import CarDetail from '../components/result/CarDetail';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import CarRecommendation from '../components/result/CarRecommendation';
import Disqus from 'disqus-react';

export default function Result() {
  const params = useParams();
  const carId = params.id;
  const [carData, setCarData] = useState({});
  useEffect(() => {
    axios
      .get(`https://6191b2cf41928b0017690111.mockapi.io/detail/${carId}`)
      .then((res) => setCarData(res.data));
  }, [carId]);
  const disqusShortname = 'WhatCar';
  const disqusConfig = {
    url: `http://localhost:3000/result/${carId}`,
    identifier: carData.modelName,
    title: carData.modelName,
  };

  return (
    <ResultWrapper>
      <CarDetail detail={carData} />
      <ShareButton></ShareButton>
      {carData.findMore && <CarRecommendation findMore={carData.findMore} />}
      <DisqusFrame>
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </DisqusFrame>
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  text-align: center;
`;

const DisqusFrame = styled.div`
  margin: 55rem 0 5rem;
`;
