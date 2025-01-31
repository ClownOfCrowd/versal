'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
  onLoad
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Определяем оптимальные размеры для разных устройств
  const getOptimizedSizes = () => {
    if (isMobile) return '100vw';
    if (isTablet) return '50vw';
    return sizes;
  };

  // Определяем, нужно ли использовать приоритетную загрузку
  const shouldPrioritize = priority || (typeof window !== 'undefined' && window.innerHeight * 2 > (height || 0));

  useEffect(() => {
    // Предзагрузка изображения для приоритетных элементов
    if (shouldPrioritize && src && typeof window !== 'undefined') {
      const img = document.createElement('img');
      img.src = src;
    }
  }, [src, shouldPrioritize]);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative ${className} ${isLoading ? 'animate-pulse bg-gray-800' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={shouldPrioritize}
        quality={quality}
        sizes={getOptimizedSizes()}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        loading={shouldPrioritize ? 'eager' : 'lazy'}
      />
    </div>
  );
} 