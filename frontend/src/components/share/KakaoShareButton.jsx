import React from 'react';
import { Helmet } from 'react-helmet';
import { kakaoShare } from '../../utils/kakaoShare';
import kakao from '../../img/share/kakao.png';
import styled from 'styled-components';
import { blue, black, kakaocolor } from '../../css/colors';
import { Button } from '@mui/material';

function KakaoShareButton() {
  const kakaoimg = kakao;
  const onKakaoClick = () => {
    kakaoShare();
  };
  return (
    <KakaoButton
      className="kakaoShareButton"
      onClick={onKakaoClick}
      variant="contained"
      color="secondary"
    >
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Helmet>
      <Img src={kakaoimg} height="40px" width="40px"></Img>
      <a>공유하기</a>
    </KakaoButton>
  );
}

const KakaoButton = styled(Button)({
  width: '113px',
});

const Img = styled.img`
  padding-left: 5px;
  padding-right: 5px;
`;

export default KakaoShareButton;
