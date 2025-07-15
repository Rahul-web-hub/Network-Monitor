import React, { useState } from 'react';

const useIntersectionObserver = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = React.useRef(null);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(entry.target.id);
            } else {
              newSet.delete(entry.target.id);
            }
            return newSet;
          });
        });
      },
      { threshold: 0.1 }
    );

    // Observer setup happens after DOM renders
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.card[id]');
      cards.forEach(card => {
        observerRef.current?.observe(card);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  return { visibleElements };
};
export { useIntersectionObserver };