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
    <div className="linkShareButton">
      <Button onClick={onLinkClick}>
        <img className="link" src={link} height="32px" width="32px"></img>
      </Button>
    </div>
  );
}

const Button = styled.button`
  background-color: #ffffff;
  width: 45px;
  height: 45px;
`;

export default LinkShareButton;
