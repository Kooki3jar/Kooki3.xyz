import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Kooki3`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}