import { useState, useEffect, useCallback } from 'react';

const baseOption = {
  root: null,
  threshold: 1,
  rootMargin: '0px',
};
const useInfinity = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref]);
  return [ref, setRef];
};

export default useInfinity;
