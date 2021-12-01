import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import Intro from '../components/main/Intro.jsx';
import HowTo from '../components/main/HowTo.jsx';
import Brands from '../components/main/Brands.jsx';
import ServiceIntro from '../components/main/ServiceIntro.jsx';

export default function Main() {
  return (
    <>
      <Intro />
      <HowTo />
      <Brands />
      <ServiceIntro />
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
