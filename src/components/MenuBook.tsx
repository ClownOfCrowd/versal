'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isSpecial?: boolean;
}

const menuData = {
  starters: [
    {
      id: 1,
      name: 'Тартар из тунца',
      description: 'с авокадо и трюфельным соусом',
      price: 2800,
      category: 'starters',
      isSpecial: true
    },
    {
      id: 2,
      name: 'Карпаччо из говядины',
      description: 'с рукколой и пармезаном',
      price: 2400,
      category: 'starters'
    },
    {
      id: 3,
      name: 'Устрицы Фин де Клер',
      description: '6 штук',
      price: 3600,
      category: 'starters',
      isSpecial: true
    }
  ],
  soups: [
    {
      id: 4,
      name: 'Крем-суп из тыквы',
      description: 'с трюфельным маслом и тыквенными семечками',
      price: 1200,
      category: 'soups'
    },
    {
      id: 5,
      name: 'Консоме из утки',
      description: 'с фуа-гра и черным трюфелем',
      price: 1800,
      category: 'soups',
      isSpecial: true
    }
  ],
  mainCourses: [
    {
      id: 6,
      name: 'Филе миньон',
      description: 'с картофельным пюре и соусом из красного вина',
      price: 4200,
      category: 'main',
      isSpecial: true
    },
    {
      id: 7,
      name: 'Дикий сибас',
      description: 'с артишоками и соусом вержэ',
      price: 3800,
      category: 'main'
    }
  ],
  desserts: [
    {
      id: 8,
      name: 'Шоколадный фондан',
      description: 'с ванильным мороженым',
      price: 1500,
      category: 'desserts'
    },
    {
      id: 9,
      name: 'Крем-брюле',
      description: 'с карамелизированными фруктами',
      price: 1200,
      category: 'desserts'
    }
  ]
};

export default function MenuBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isFlipping) return;
    const diff = startX - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < 1) {
        flipPage('next');
      } else if (diff < 0 && currentPage > 0) {
        flipPage('prev');
      }
    }
  };

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    setIsFlipping(true);
    setCurrentPage(prev => direction === 'next' ? prev + 1 : prev - 1);
    setTimeout(() => setIsFlipping(false), 500);
  };

  const renderMenuItem = (item: MenuItem) => (
    <motion.div
      key={item.id}
      className="mb-8 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-baseline relative overflow-hidden">
        <div className="flex-1">
          <h3 className="font-playfair text-xl group-hover:text-accent transition-colors relative">
            {item.name}
            {item.isSpecial && (
              <motion.span
                className="ml-2 text-accent text-sm absolute -top-1"
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                ★
              </motion.span>
            )}
          </h3>
          <p className="text-gray-600 text-sm italic mt-1">{item.description}</p>
        </div>
        <motion.div
          className="font-playfair text-xl ml-4 relative"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {item.price}₽
        </motion.div>
      </div>
      {item.image && (
        <motion.div
          className="mt-2 overflow-hidden rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={150}
            className="rounded-lg object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="relative max-w-5xl mx-auto perspective-1000"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <motion.div 
        className="bg-[#f8f5f0] text-dark p-8 md:p-12 shadow-2xl relative"
        style={{
          backgroundImage: 'url(/images/paper-texture.png)',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover'
        }}
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Декоративный уголок */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className="transform-gpu"
          >
            {currentPage === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <motion.h2
                    className="font-playfair text-3xl mb-6 pb-2 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Закуски
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                  </motion.h2>
                  {menuData.starters.map(renderMenuItem)}
                </div>
                <div>
                  <motion.h2
                    className="font-playfair text-3xl mb-6 pb-2 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Супы
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.h2>
                  {menuData.soups.map(renderMenuItem)}
                </div>
              </div>
            )}

            {currentPage === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <motion.h2
                    className="font-playfair text-3xl mb-6 pb-2 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Основные блюда
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                  </motion.h2>
                  {menuData.mainCourses.map(renderMenuItem)}
                </div>
                <div>
                  <motion.h2
                    className="font-playfair text-3xl mb-6 pb-2 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Десерты
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.h2>
                  {menuData.desserts.map(renderMenuItem)}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Кнопки навигации */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => flipPage('prev')}
            disabled={currentPage === 0}
            className={`px-6 py-3 border-2 border-dark font-playfair transition-all ${
              currentPage === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-dark hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <div className="flex items-center gap-2">
            {[0, 1].map(page => (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === page 
                    ? 'bg-dark scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => flipPage('next')}
            disabled={currentPage === 1}
            className={`px-6 py-3 border-2 border-dark font-playfair transition-all ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-dark hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 