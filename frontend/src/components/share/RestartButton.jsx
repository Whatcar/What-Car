import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

function RestartButton({ linkTo, buttonTitle = false }) {
  const navigate = useNavigate();
  const onRestartClick = () => {
    navigate(linkTo);
  };
  return (
    <Button
      onClick={onRestartClick}
      variant="contained"
      startIcon={<RefreshRoundedIcon width="20px" />}
      sx={{ padding: '15px', width: '100%', lineHeight: '1rem' }}
    >
      {buttonTitle ? buttonTitle : '다시 시작 하기'}
    </Button>
  );
}

export default RestartButton;
