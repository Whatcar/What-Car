import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../img/carLoading.json';
import useSrr from '../utils/useSrr';

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={defaultOptions} height={300} width={300} />
    </>
  );
}
