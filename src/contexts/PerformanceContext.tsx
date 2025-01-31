'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkDevicePerformance } from '@/utils/performance';

type PerformanceLevel = 'low' | 'medium' | 'high';

interface PerformanceContextType {
  performanceLevel: PerformanceLevel;
  isReducedMotion: boolean;
  isPrefersLightMode: boolean;
  isSaveData: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  performanceLevel: 'high',
  isReducedMotion: false,
  isPrefersLightMode: false,
  isSaveData: false,
});

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [performanceLevel, setPerformanceLevel] = useState<PerformanceLevel>('high');
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPrefersLightMode, setIsPrefersLightMode] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);

  useEffect(() => {
    // Определяем уровень производительности устройства
    const level = checkDevicePerformance() as PerformanceLevel;
    setPerformanceLevel(level);

    // Проверяем предпочтения пользователя
    if (typeof window !== 'undefined') {
      // Проверка предпочтений анимации
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(prefersReducedMotion.matches);

      // Проверка предпочтений темы
      const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)');
      setIsPrefersLightMode(prefersLightMode.matches);

      // Проверка режима экономии данных
      const connection = (navigator as Navigator & { connection?: { saveData: boolean } }).connection;
      setIsSaveData(connection?.saveData || false);

      // Слушатели изменений
      const motionListener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      const themeListener = (e: MediaQueryListEvent) => setIsPrefersLightMode(e.matches);

      prefersReducedMotion.addEventListener('change', motionListener);
      prefersLightMode.addEventListener('change', themeListener);

      return () => {
        prefersReducedMotion.removeEventListener('change', motionListener);
        prefersLightMode.removeEventListener('change', themeListener);
      };
    }
  }, []);

  return (
    <PerformanceContext.Provider
      value={{
        performanceLevel,
        isReducedMotion,
        isPrefersLightMode,
        isSaveData,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
} 