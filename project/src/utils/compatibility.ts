import { detect } from './browserDetect';

export async function checkBrowserCompatibility() {
  const compatibility = {
    webp: false,
    webgl: false,
    websockets: false,
    localStorage: false,
    serviceWorker: false,
    webAssembly: false,
    flexbox: false,
    grid: false,
    customProperties: false,
    intersectionObserver: false,
    mutationObserver: false,
    resizeObserver: false,
  };

  // Check WebP support
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    compatibility.webp = true;
  }

  // Check WebGL support
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    compatibility.webgl = !!gl;
  } catch (e) {
    compatibility.webgl = false;
  }

  // Check WebSocket support
  compatibility.websockets = 'WebSocket' in window;

  // Check localStorage support
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    compatibility.localStorage = true;
  } catch (e) {
    compatibility.localStorage = false;
  }

  // Check Service Worker support
  compatibility.serviceWorker = 'serviceWorker' in navigator;

  // Check WebAssembly support
  compatibility.webAssembly = typeof WebAssembly === 'object';

  // Check CSS Features
  compatibility.flexbox = CSS.supports('display', 'flex');
  compatibility.grid = CSS.supports('display', 'grid');
  compatibility.customProperties = CSS.supports('--test', 'red');

  // Check Modern APIs
  compatibility.intersectionObserver = 'IntersectionObserver' in window;
  compatibility.mutationObserver = 'MutationObserver' in window;
  compatibility.resizeObserver = 'ResizeObserver' in window;

  return compatibility;
}

// Rest of the file remains the same...