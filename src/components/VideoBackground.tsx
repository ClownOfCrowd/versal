'use client';

import { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Замедляем видео для более плавного эффекта
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>
      <div className="video-overlay" />
    </>
  );
} 