import { useEffect, useRef, useState } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useOptimizedAnimation({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true
}: AnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Проверяем поддержку Intersection Observer
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    // Проверяем, нужно ли запускать анимацию
    if (triggerOnce && hasAnimated) {
      return;
    }

    // Проверяем производительность устройства
    const isLowPerfDevice = 
      window.navigator.hardwareConcurrency <= 4 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isLowPerfDevice) {
      setIsVisible(true);
      return;
    }

    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { isVisible, elementRef };
} 