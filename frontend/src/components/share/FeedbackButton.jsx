import React from 'react';
import { Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function FeedbackButton() {
  const handleClick = () => {
    // TODO: 허가 or not을 swal로 구현
    alert('업로드?');
  };
  return (
    <Button
      variant="outlined"
      startIcon={<ChevronRightRoundedIcon />}
      sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
      onClick={handleClick}
    >
      왓카 갤러리에 올리기
    </Button>
  );
}
