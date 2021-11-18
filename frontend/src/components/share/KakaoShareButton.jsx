import React from 'react';
import { Helmet } from 'react-helmet';
import { kakaoShare } from '../../utils/kakaoShare';
import kakao from '../../img/share/kakao.png';
import styled from 'styled-components';

function KakaoShareButton() {
  const onKakaoClick = () => {
    kakaoShare();
  };
  return (
    <div className="kakaoShareButton">
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Helmet>
      <Button onClick={onKakaoClick}>
        <img src={kakao} height="40px" width="40px"></img>
        <a>공유하기</a>
      </Button>
    </div>
  );
}

const Button = styled.button`
  display: inline;
  background-color: #f7e600;
  width: 115px;
  height: 45px;
  font-size: 16px;
`;
export default KakaoShareButton;
