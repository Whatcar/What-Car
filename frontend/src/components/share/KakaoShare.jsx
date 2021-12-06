import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@mui/material';
import { colors } from '../../css/theme';
import kakaoLogo from '../../img/share/kakaotalk.svg';
import { kakaoShare } from '../../utils/kakaoShare';

export default function KakaoShare({ title, description, imgUrl, link, buttonTitle }) {
  return (
    <>
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script>window.Kakao.init(process.env.REACT_APP_KAKAO_KEY)</script>
      </Helmet>
      <Button
        variant="contained"
        startIcon={<img src={kakaoLogo} width="20px" />}
        color="secondary"
        sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
        onClick={() => kakaoShare(title, description, imgUrl, link, buttonTitle)}
      >
        카카오톡 공유하기
      </Button>
    </>
  );
}
