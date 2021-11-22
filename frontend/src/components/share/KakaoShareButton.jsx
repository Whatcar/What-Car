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
    <KakaoButton className="kakaoShareButton" onClick={onKakaoClick}>
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Helmet>
      <Img src={kakao} height="40px" width="40px"></Img>
      <a>공유하기</a>
    </KakaoButton>
  );
}

const KakaoButton = styled.div`
  background-color: #f7e600;
  width: 113px;
  height: 43px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
  border: 1px solid #f7e600;
`;

const Img = styled.img`
  padding-left: 5px;
  padding-right: 5px;
`;

export default KakaoShareButton;
