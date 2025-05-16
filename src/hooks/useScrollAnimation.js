import { useEffect, useState, useRef } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const elementsRef = useRef({});

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if elements are in viewport
  useEffect(() => {
    const checkVisibility = () => {
      const newIsVisible = {};

      Object.entries(elementsRef.current).forEach(([id, element]) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const isInViewport = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
          rect.bottom >= 0
        );

        newIsVisible[id] = isInViewport;
      });

      setIsVisible(prev => {
        // Only update if something changed
        const hasChanges = Object.entries(newIsVisible).some(
          ([id, visible]) => prev[id] !== visible
        );
        
        return hasChanges ? newIsVisible : prev;
      });
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [scrollY]);

  const registerElement = (id, ref) => {
    if (ref && !elementsRef.current[id]) {
      elementsRef.current[id] = ref;
    }
  };

  return { 
    isVisible, 
    registerElement,
    scrollY 
  };
}

export default useScrollAnimation;
