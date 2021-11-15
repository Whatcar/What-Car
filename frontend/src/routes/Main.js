import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import Intro from '../components/main/Intro';
import HowTo from '../components/main/HowTo';

export default function Main() {
  return (
    <>
      <Intro />
      <HowTo />
      <div style={{ textAlign: 'center' }}>
        <StyledButton
          variant="outlined"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          위로 올라가기
        </StyledButton>
      </div>
    </>
  );
}

const StyledButton = styled(Button)({
  width: '300px',
});
