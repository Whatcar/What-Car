require('dotenv').config();
const { location } = window;
const appKey = process.env.REACT_APP_KAKAO_KEY;
export const kakaoShare = (imageUrl) => {
  //   const shareUrl = location.href;
  const shareUrl = 'https://www.naver.com';

  if (window.Kakao) {
    console.log('yes');
    console.log(appKey);
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
    // window.Kakao.Link.sendDefault({
    //   objectType: 'feed',
    //   content: {
    //     title: 'WhatCar!',
    //     description: '이 차 뭐징? 궁금하다면 찰칵 후 업로드!',
    //     imageUrl: kakao,
    //     link: {
    //       webUrl: shareUrl,
    //       mobileWebUrl: shareUrl,
    //     },
    //   },
    //   buttons: [
    //     {
    //       title: '이 차 뭐징? 궁금하다면 찰칵 후 업로드!',
    //       link: {
    //         webUrl: shareUrl,
    //         mobileWebUrl: shareUrl,
    //       },
    //     },
    //   ],
    // });
    window.Kakao.Link.sendCustom({
      templateId: 65266,
      templateArgs: {
        title: 'WhatCar?!',
        description: '이 차 뭐징? 궁금하다면 찰칵 후 업로드!',
      },
    });
  } else {
    console.log('no');
  }
};
