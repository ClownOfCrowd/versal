// Проверка производительности устройства
export const checkDevicePerformance = () => {
  if (typeof window === 'undefined') return 'high';

  const { hardwareConcurrency, deviceMemory } = navigator as Navigator & {
    deviceMemory?: number;
  };

  // Проверяем количество ядер процессора
  const lowCPU = hardwareConcurrency <= 4;
  
  // Проверяем объем памяти (если доступно)
  const lowMemory = deviceMemory !== undefined && deviceMemory < 4;
  
  // Проверяем тип устройства
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (lowCPU || lowMemory) return 'low';
  if (isMobile) return 'medium';
  return 'high';
};

// Оптимизация анимаций в зависимости от производительности
export const getOptimizedAnimationConfig = (performanceLevel = 'high') => {
  const configs = {
    high: {
      duration: 0.3,
      ease: [0.6, 0.01, -0.05, 0.95],
      staggerChildren: 0.1,
    },
    medium: {
      duration: 0.2,
      ease: 'easeInOut',
      staggerChildren: 0.05,
    },
    low: {
      duration: 0.1,
      ease: 'linear',
      staggerChildren: 0,
    },
  };

  return configs[performanceLevel as keyof typeof configs];
};

// Оптимизация изображений
export const getOptimizedImageParams = (performanceLevel = 'high') => {
  const params = {
    high: {
      quality: 85,
      sizes: '100vw',
      loading: 'lazy' as const,
    },
    medium: {
      quality: 75,
      sizes: '100vw',
      loading: 'lazy' as const,
    },
    low: {
      quality: 60,
      sizes: '100vw',
      loading: 'lazy' as const,
    },
  };

  return params[performanceLevel as keyof typeof params];
};

// Оптимизация событий скролла
export const createOptimizedScrollHandler = (callback: () => void, wait = 16) => {
  let ticking = false;

  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Оптимизация рендеринга списков
export const getOptimizedListConfig = (performanceLevel = 'high') => {
  const configs = {
    high: {
      itemsPerPage: 20,
      loadMoreThreshold: 0.8,
    },
    medium: {
      itemsPerPage: 15,
      loadMoreThreshold: 0.9,
    },
    low: {
      itemsPerPage: 10,
      loadMoreThreshold: 1,
    },
  };

  return configs[performanceLevel as keyof typeof configs];
};

// Оптимизация эффектов размытия и прозрачности
export const getOptimizedBlurConfig = (performanceLevel = 'high') => {
  const configs = {
    high: {
      backdropFilter: 'blur(10px)',
      opacity: 0.8,
    },
    medium: {
      backdropFilter: 'blur(5px)',
      opacity: 0.9,
    },
    low: {
      backdropFilter: 'none',
      opacity: 1,
    },
  };

  return configs[performanceLevel as keyof typeof configs];
}; 