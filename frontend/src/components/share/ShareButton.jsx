import React from 'react';
import KakaoShareButton from '../share/KakaoShareButton';
import LinkShareButton from '../share/LinkShareButton';
import RestartButton from '../share/RestartButton';

export default function ShareButton() {
  return (
    <div>
      <KakaoShareButton></KakaoShareButton>
      <LinkShareButton></LinkShareButton>
      <RestartButton></RestartButton>
    </div>
  );
}
