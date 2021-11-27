import React from 'react';
import link from '../../img/share/link.png';
import styled from 'styled-components';
import { blue, black } from '../../css/colors';
import { Button } from '@mui/material';

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
    <LinkButton className="linkShareButton" variant="contained" onClick={onLinkClick} color="white">
      <img className="link" src={link} height="32px" width="32px"></img>
    </LinkButton>
  );
}

const LinkButton = styled(Button)({
  width: '40px',
});

export default LinkShareButton;
