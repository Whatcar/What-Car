import React from 'react';
import { Button } from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import Swal from 'sweetalert2';

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
    Swal.fire({
      icon: 'success',
      title: 'URL이 복사되었습니다.',
    });
  };
  return (
    <Button
      className="linkShareButton"
      variant="contained"
      onClick={onLinkClick}
      color="white"
      startIcon={<LinkRoundedIcon sx={{ transform: 'rotate(-45deg)', width: '20px' }} />}
      sx={{ padding: '15px', width: '100%', lineHeight: '1rem', height: '100%' }}
    >
      링크 복사하기
    </Button>
  );
}

export default LinkShareButton;
