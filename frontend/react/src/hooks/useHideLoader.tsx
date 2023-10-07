import { useEffect } from 'react';

export function useHideLoader() {
  useEffect(() => {
    const overlay = document.querySelector('.loader-overlay');
    const loader = document.querySelector('.main-loader');

    setTimeout(() => {
      if (loader) {
        loader.remove();
      }

      if (overlay) {
        overlay.remove();
      }
    }, 300)
  }, []);
}
