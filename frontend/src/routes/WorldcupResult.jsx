import React from 'react';
import { useLocation } from 'react-router-dom';

export default function WorldcupResult() {
  const { state } = useLocation();
  console.log(state);
  const resultData = state.filter((item) => item['is_result'] === true)[0];
  return (
    <div>
      <p>This is 결과</p>
      <img src={resultData.photolink} alt="결과 이미지" />
    </div>
  );
}
