'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  priority = false,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (priority || isInView) {
      const playVideo = async () => {
        try {
          if (video.paused) {
            await video.play();
          }
        } catch (error) {
          console.error('Ошибка воспроизведения видео:', error);
        }
      };

      video.load();
      playVideo();
    }
  }, [isInView, priority]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className} ${!isLoaded ? 'bg-gray-900' : ''}`}
    >
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onLoadedData={handleLoadedData}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
} 