import { Button } from '@mui/material';
import React from 'react';
import { MainTitle, SubTitle } from '../../css/mainStyles';
import { useNavigate } from 'react-router';
import useSrr from '../../utils/useSrr';

export default function Section1({ desc, moreDesc, buttonText, linkTo }) {
  const navigate = useNavigate();
  return (
    <>
      <MainTitle {...useSrr('right')}>{desc}</MainTitle>
      <SubTitle>{moreDesc}</SubTitle>
      <Button variant="contained" onClick={() => navigate(linkTo)}>
        {buttonText}
      </Button>
    </>
  );
}
