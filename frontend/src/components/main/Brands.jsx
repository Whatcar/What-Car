import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../../css/mainStyles';
import getEmblem from '../../utils/getEmblem';
import useIntersect from '../../utils/useIntersect';

export default function Brands() {
  const emblems = getEmblem('전체').map((i) => i[1]);
  console.log(emblems.length);

  return (
    <BrandWrapper>
      <BrandSlide {...useIntersect('marginLeft', '-90')}>
        {emblems.map((item, index) => (
          <BrandImg key={`brand-image-${index}`} src={item} />
        ))}
      </BrandSlide>
      <MainTitle {...useIntersect('left', '10')}>
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

  h2 {
    position: absolute;
    top: 40%;
    text-shadow: 0 0 0.5rem dimgray;
    font-size: 4.5rem;
    line-height: 4.7rem;
    @media screen and (max-width: 480px) {
      top: 30%;
      font-size: 3rem;
      line-height: 3.2rem;
    }
    transition: all 2.5s ease;
  }
`;

const BrandSlide = styled.div`
  width: 200%;
  transition: all 2.5s ease;
  margin: 1rem 0;
  opacity: 0.4;
`;

const BrandImg = styled.img`
  display: inline-block;
  width: 6%;
  @media screen and (max-width: 480px) {
    width: 10%;
  }
`;
