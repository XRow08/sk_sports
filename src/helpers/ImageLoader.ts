import type { ImageLoader } from 'next/image';

export const imageLoader: ImageLoader = ({ src, width, quality }) => {
  const secureUrl = src.startsWith('http://')
    ? src.replace('http://', 'https://')
    : src;
  const separator = secureUrl.includes('?') ? '&' : '?';
  const params = [];
  if (width) params.push(`w=${width}`);
  if (quality) params.push(`q=${quality || 100}`);
  const queryString = params.length > 0 ? `${separator}${params.join('&')}` : '';
  return `${secureUrl}${queryString}`;
};

export default imageLoader;