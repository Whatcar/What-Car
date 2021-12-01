import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import getEmblem from '../../utils/getEmblem';

export default function Brands() {
  const [target, setTarget] = useState(null);
  const emblems = getEmblem('전체').map((i) => i[1]);
  console.log(emblems.length);
  useEffect(() => {
    let observer;
    const thresholdList = [
      0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0,
    ];
    if (target) {
      observer = new IntersectionObserver(_onIntersect, { threshold: thresholdList });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  let prevRatio;
  const _onIntersect = (entries, observer) => {
    console.log(prevRatio);
    entries.forEach((entry) => {
      if (entry.intersectionRatio > prevRatio) {
        console.log('scrolling down', prevRatio, 'to', entry.intersectionRatio);
        entry.target.style.marginLeft = `-${(entry.intersectionRatio - 0.3) * 200}%`;
      } else {
        console.log('scrolling up', prevRatio, 'to', entry.intersectionRatio);
        entry.target.style.marginLeft = `-${(entry.intersectionRatio - 0.3) * 200}%`;
      }
      prevRatio = entry.intersectionRatio;
    });
  };
  return (
    <BrandWrapper>
      <BrandSlide ref={setTarget}>
        {emblems.map((item, index) => (
          <BrandImg key={`brand-image-${index}`} scrollNow={prevRatio} src={item} />
        ))}
      </BrandSlide>
    </BrandWrapper>
  );
}

const BrandWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const BrandSlide = styled.div`
  width: 200%;
  transition: all 0.2s ease;
`;

const BrandImg = styled.img`
  display: inline-block;
  width: 100px;
  margin-top: ${(props) => props.scrollNow && `${props.scrollNow * 10}px`};
`;
