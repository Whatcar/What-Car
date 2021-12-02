import React from 'react';
import styled from 'styled-components';
import { blue } from '../../css/colors';
import { MainTitle } from '../../css/mainStyles';
import getEmblem from '../../utils/getEmblem';
import useIntersect from '../../utils/useIntersect';

export default function ServiceIntro() {
  return (
    <ServiceWrapper>
      <BgDiv {...useIntersect('marginLeft', '-45')} />
      <MainTitle {...useIntersect('right', '10')}>
        <span style={{ color: blue.main }}>찰칵!</span>
        <br />한 번으로
        <br />
        쉽게
      </MainTitle>
    </ServiceWrapper>
  );
}

const ServiceWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  h2 {
    font-size: 4.5rem;
    line-height: 4.7rem;
    text-align: right;
    position: absolute;
    top: 30%;
    right: 3%;
    transition: all 2.5s ease;
    -webkit-transition: all 2.5s ease;
    -moz-transition: all 2.5s ease;
    -o-transition: all 2.5s ease;
    text-shadow: 0 0 0.5rem dimgray;

    @media screen and (max-width: 480px) {
      font-size: 3rem;
      line-height: 3.2rem;
    }
  }
  div {
    transition: all 2.5s ease;
    -webkit-transition: all 2.5s ease;
    -moz-transition: all 2.5s ease;
    -o-transition: all 2.5s ease;
  }
`;

const BgDiv = styled.div`
  width: 150%;
  height: 50vh;
  margin: 5rem -45% 5rem 0;
  opacity: 0.5;
  background: radial-gradient(black 3px, transparent 4px),
    radial-gradient(black 3px, transparent 4px), linear-gradient(#fff 4px, transparent 0),
    linear-gradient(
      45deg,
      transparent 74px,
      transparent 75px,
      #a4a4a4 75px,
      #a4a4a4 76px,
      transparent 77px,
      transparent 109px
    ),
    linear-gradient(
      -45deg,
      transparent 75px,
      transparent 76px,
      #a4a4a4 76px,
      #a4a4a4 77px,
      transparent 78px,
      transparent 109px
    ),
    #fff;
  background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
  background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
`;
