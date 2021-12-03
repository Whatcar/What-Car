import React from 'react';
import styled from 'styled-components';

export default function Layout({ children }) {
  return <Contents>{children}</Contents>;
}

const Contents = styled.div`
  width: 66%;
  margin: 10rem auto;
  @media screen and (max-width: 480px) {
    width: 85%;
    margin: 5rem auto;
  }
`;
