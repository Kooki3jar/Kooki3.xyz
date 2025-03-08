import { useState, useEffect } from 'react';

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedKooki3');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedKooki3', 'true');
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  return isFirstVisit;
}