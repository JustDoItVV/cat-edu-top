import { useEffect, useState } from 'react';

export const useScrollY = (): number => {
  const [scrollY, setScrollY] = useState(0);

  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0;
    setScrollY(currentScrollY);
  };

  return scrollY;
};