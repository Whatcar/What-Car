import React, { useRef, useState, useEffect, useCallback } from 'react';

const useIntersect = (styleDetail = 'marginLeft', toExtent = '-90') => {
  const element = useRef();

  const onIntersect = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        current.style[`${styleDetail}`] =
          current.style[`${styleDetail}`] === `${toExtent}%` ? '3%' : `${toExtent}%`;
      }
    },
    [styleDetail, toExtent],
  );
  useEffect(() => {
    let observer;
    if (element.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
      observer.observe(element.current);
    }
    return () => observer && observer.disconnect();
  }, [element]);

  return {
    ref: element,
  };
};

export default useIntersect;
