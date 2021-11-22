import React from 'react';
import link from '../../img/share/link.png';
import styled from 'styled-components';

function LinkShareButton() {
  const onLinkClick = () => {
    var url = '';
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL이 복사되었습니다.');
  };
  return (
    <LinkButton className="linkShareButton" onClick={onLinkClick}>
      <img className="link" src={link} height="32px" width="32px"></img>
    </LinkButton>
  );
}

const LinkButton = styled.div`
  background-color: #ffffff;
  width: 43px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
`;

export default LinkShareButton;
