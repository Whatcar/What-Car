require('dotenv').config();
const { location } = window;
const appKey = process.env.REACT_APP_KAKAO_KEY;

export const kakaoShare = (
  shareTitle = '왓카 | WhatCar',
  shareDescription = '차가 궁금하다면, 왓카!',
  imgUrl = 'http://localhost:3000/logo512.png',
  link = location.href,
  buttonTitle = '보러 가기',
) => {
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDescription,
        imageUrl: imgUrl,
        link: {
          webUrl: link,
          mobileWebUrl: link,
        },
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            webUrl: link,
            mobileWebUrl: link,
          },
        },
      ],
    });
  }
};
