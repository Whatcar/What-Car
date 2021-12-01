import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../../css/mainStyles';
import getEmblem from '../../utils/getEmblem';
import useIntersect from '../../utils/useIntersect';

export default function Brands() {
  const emblems = getEmblem('전체').map((i) => i[1]);
  console.log(emblems.length);

  return (
    <BrandWrapper {...useIntersect()}>
      <BrandSlide>
        {emblems.map((item, index) => (
          <BrandImg key={`brand-image-${index}`} src={item} />
        ))}
      </BrandSlide>
      <MainTitle style={{ fontSize: '4.5rem', lineHeight: '4.7rem' }}>
        이렇게 다양한 <br />
        브랜드의 차들을
      </MainTitle>
    </BrandWrapper>
  );
}

const BrandWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;

  div {
    width: 200%;
    transition: all 2.5s ease;
    margin: 10rem 0;
    opacity: 0.4;
    margin-left: ${(props) => (props.direction && props.direction === 'up' ? `0%` : '-95%')};
  }
  h2 {
    position: absolute;
    top: 40%;
    @media screen and (max-width: 480px) {
      top: 30%;
    }
    transition: all 2.5s ease;
    left: ${(props) => (props.direction && props.direction === 'up' ? '0%' : '10%')};
  }
`;

const BrandSlide = styled.div``;

const BrandImg = styled.img`
  display: inline-block;
  width: 6%;
  @media screen and (max-width: 480px) {
    width: 10%;
  }
`;
