'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MenuBook from '@/components/MenuBook';

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark">
      {/* Фоновое изображение с параллакс-эффектом */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: 'url(/images/menu-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          y
        }}
      />

      {/* Основной контент */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Анимированный заголовок */}
          <motion.div 
            className="text-center mb-12"
            style={{ opacity, scale }}
          >
            <motion.h1 
              className="font-playfair text-6xl md:text-7xl lg:text-8xl text-accent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Меню
            </motion.h1>
            <motion.div
              className="text-gray-400 text-sm md:text-base uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Изысканная кухня
            </motion.div>
          </motion.div>

          {/* Декоративные элементы */}
          <motion.div
            className="max-w-3xl mx-auto mb-12 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
              <motion.div 
                className="font-playfair text-accent text-2xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring" }}
              >
                ✦
              </motion.div>
              <motion.div 
                className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
          </motion.div>

          {/* Компонент книги меню */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative z-20"
          >
            <MenuBook />
          </motion.div>

          {/* Дополнительная информация */}
          <motion.div
            className="mt-16 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Все цены указаны в рублях. НДС включен.
            </motion.p>
            <motion.p
              className="mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              При наличии аллергии, пожалуйста, сообщите об этом официанту.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 