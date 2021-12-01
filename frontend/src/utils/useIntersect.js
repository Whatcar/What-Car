import React, { useRef, useState, useEffect, useCallback } from 'react';

const useIntersect = () => {
  const element = useRef();
  const [direction, setDirection] = useState(null);
  let prevRatio = 0;

  const handleDirection = (way) => {
    switch (way) {
      case 'up':
        return 'translate3d(20%, 0, 0)';
      case 'down':
        return 'translate3d(-20%, 0, 0)';
    }
  };

  const onIntersect = useCallback(([entry]) => {
    if (entry.intersectionRatio > prevRatio) {
      setDirection('down');
      console.log('down');
    } else if (entry.intersectionRatio < prevRatio) {
      setDirection('up');
      console.log('up');
    }
    prevRatio = entry.intersectionRatio;
  }, []);
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
    direction: direction,
  };
};

export default useIntersect;
