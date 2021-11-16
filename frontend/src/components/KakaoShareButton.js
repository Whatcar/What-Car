import React from 'react';
import { Helmet } from 'react-helmet';
import { kakaoShare } from '../utils/kakaoShare';
import kakao from '../img/kakao.png';

function KakaoShareButton() {
  const onKakaoClick = () => {
    kakaoShare();
  };
  return (
    <div className="kakaoShareButton">
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Helmet>
      <button onClick={onKakaoClick}>
        <img src={kakao}></img>
      </button>
    </div>
  );
}
export default KakaoShareButton;
