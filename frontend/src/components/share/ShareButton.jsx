import styled from 'styled-components';
import React from 'react';
import KakaoShareButton from '../share/KakaoShareButton';
import LinkShareButton from '../share/LinkShareButton';
import RestartButton from '../share/RestartButton';

export default function ShareButton() {
  return (
    <div>
      <ShareBtn>
        <KakaoShareButton></KakaoShareButton>
        <LinkShareButton></LinkShareButton>
      </ShareBtn>
      <RestartButton></RestartButton>
    </div>
  );
}

const ShareBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  padding-bottom: 5px;
  margin: auto;
`;
