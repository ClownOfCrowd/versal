'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: string;
  image: string;
  video?: string; // URL для видео или GIF
  category: string;
  cookingTime: string;
  calories: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из мраморной говядины, приготовленный на открытом огне с розмарином и чесночным маслом',
    ingredients: [
      'Мраморная говядина',
      'Розмарин',
      'Чесночное масло',
      'Морская соль',
      'Свежемолотый перец'
    ],
    price: '3200₽',
    image: '/images/menu/ribeye.jpg',
    video: '/videos/menu/ribeye.mp4',
    category: 'main',
    cookingTime: '25-30 минут',
    calories: '650 ккал'
  },
  {
    id: 2,
    name: 'Тартар из тунца',
    description: 'Нежный тартар из свежего тунца с авокадо, каперсами и цитрусовой заправкой',
    ingredients: [
      'Свежий тунец',
      'Авокадо',
      'Каперсы',
      'Красный лук',
      'Цитрусовая заправка',
      'Микрозелень'
    ],
    price: '1800₽',
    image: '/images/menu/tuna-tartar.jpg',
    category: 'appetizers',
    cookingTime: '15-20 минут',
    calories: '320 ккал'
  },
  {
    id: 3,
    name: 'Фуа-гра с инжиром',
    description: 'Утиное фуа-гра с карамелизированным инжиром и бриошью',
    ingredients: [
      'Утиное фуа-гра',
      'Свежий инжир',
      'Бриошь',
      'Порто',
      'Специи'
    ],
    price: '2400₽',
    image: '/images/menu/foie-gras.jpg',
    category: 'appetizers',
    cookingTime: '20 минут',
    calories: '450 ккал'
  },
  {
    id: 4,
    name: 'Дорадо на гриле',
    description: 'Целая дорадо, приготовленная на гриле с травами и лимоном',
    ingredients: [
      'Дорадо',
      'Тимьян',
      'Розмарин',
      'Лимон',
      'Оливковое масло',
      'Чеснок'
    ],
    price: '2800₽',
    image: '/images/menu/dorado.jpg',
    category: 'main',
    cookingTime: '30-35 минут',
    calories: '440 ккал'
  },
  {
    id: 5,
    name: 'Шоколадный фондан',
    description: 'Теплый шоколадный десерт с жидкой начинкой и ванильным мороженым',
    ingredients: [
      'Бельгийский шоколад',
      'Сливочное масло',
      'Яйца',
      'Сахар',
      'Ванильное мороженое'
    ],
    price: '950₽',
    image: '/images/menu/fondant.jpg',
    category: 'desserts',
    cookingTime: '15 минут',
    calories: '460 ккал'
  },
  {
    id: 6,
    name: 'Ризотто с белыми грибами',
    description: 'Кремовое ризотто с белыми грибами и пармезаном',
    ingredients: [
      'Рис арборио',
      'Белые грибы',
      'Пармезан',
      'Белое вино',
      'Сливочное масло',
      'Лук-шалот'
    ],
    price: '1600₽',
    image: '/images/menu/risotto.jpg',
    category: 'main',
    cookingTime: '25-30 минут',
    calories: '520 ккал'
  }
];

export default function CookbookMenu() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/page-flip.mp3');
    audioRef.current.volume = 0.5;

    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping || !animationComplete) return;
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isFlipping || !animationComplete) return;
    
    const dragDistance = e.clientX - dragStart;
    const threshold = 150;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentPage > 0) {
        flipPage('prev');
      } else if (dragDistance < 0 && currentPage < menuItems.length - 4) {
        flipPage('next');
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping || !animationComplete) return;
    
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    
    setAnimationComplete(false);
    setFlipDirection(direction);
    setIsFlipping(true);
    
    // Воспроизводим звук только после начала анимации
    requestAnimationFrame(() => {
      playFlipSound();
    });

    const newPage = direction === 'next' ? currentPage + 4 : currentPage - 4;
    
    flipTimeoutRef.current = setTimeout(() => {
      setCurrentPage(newPage);
      requestAnimationFrame(() => {
        setIsFlipping(false);
        setTimeout(() => {
          setAnimationComplete(true);
        }, 30);
      });
    }, 300);
  };

  const pageVariants = {
    initial: (direction: 'next' | 'prev') => ({
      rotateY: direction === 'next' ? 0 : -180,
      transition: {
        duration: 0
      }
    }),
    animate: (direction: 'next' | 'prev') => ({
      rotateY: direction === 'next' ? -180 : 0,
      transition: {
        duration: 0.6,
        ease: [0.645, 0.045, 0.355, 1.000],
        type: "tween"
      }
    }),
    exit: (direction: 'next' | 'prev') => ({
      rotateY: direction === 'next' ? -180 : 0,
      transition: {
        duration: 0.3,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    })
  };

  const renderDishCard = (dish: MenuItem) => (
    <div className="dish-card">
      <div className="dish-media">
        {dish.video ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="dish-video"
          >
            <source src={dish.video} type="video/mp4" />
            <img 
              src={dish.image} 
              alt={dish.name}
              className="dish-image"
            />
          </video>
        ) : (
          <img 
            src={dish.image} 
            alt={dish.name}
            className="dish-image"
          />
        )}
      </div>
      <div className="dish-content">
        <div className="dish-header">
          <h3 className="dish-title">{dish.name}</h3>
          <div className="dish-price">{dish.price}</div>
        </div>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-meta">
          <span>🕒 {dish.cookingTime}</span>
          <span>📊 {dish.calories}</span>
        </div>
        <div className="dish-ingredients">
          <h4>Ингредиенты:</h4>
          <ul>
            {dish.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="book-container">
      <div 
        ref={bookRef}
        className="book"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <motion.div 
          className="book-page left-page"
          initial={false}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.15 }
          }}
        >
          <div className="page-content">
            {menuItems[currentPage] && renderDishCard(menuItems[currentPage])}
            {menuItems[currentPage + 1] && renderDishCard(menuItems[currentPage + 1])}
          </div>
        </motion.div>
        
        <motion.div 
          className="book-page right-page"
          initial={false}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.15 }
          }}
        >
          <div className="page-content">
            {menuItems[currentPage + 2] && renderDishCard(menuItems[currentPage + 2])}
            {menuItems[currentPage + 3] && renderDishCard(menuItems[currentPage + 3])}
          </div>
        </motion.div>

        <AnimatePresence mode="wait" onExitComplete={() => setAnimationComplete(true)}>
          {isFlipping && (
            <motion.div
              className={`flipping-page ${flipDirection === 'next' ? 'flip-right' : 'flip-left'} animate`}
              custom={flipDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
            >
              <motion.div 
                className="page-front"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="page-content">
                  {flipDirection === 'next' ? (
                    <>
                      {menuItems[currentPage + 2] && renderDishCard(menuItems[currentPage + 2])}
                      {menuItems[currentPage + 3] && renderDishCard(menuItems[currentPage + 3])}
                    </>
                  ) : (
                    <>
                      {menuItems[currentPage] && renderDishCard(menuItems[currentPage])}
                      {menuItems[currentPage + 1] && renderDishCard(menuItems[currentPage + 1])}
                    </>
                  )}
                </div>
              </motion.div>
              <motion.div 
                className="page-back"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="page-content">
                  {flipDirection === 'next' ? (
                    <>
                      {menuItems[currentPage + 4] && renderDishCard(menuItems[currentPage + 4])}
                      {menuItems[currentPage + 5] && renderDishCard(menuItems[currentPage + 5])}
                    </>
                  ) : (
                    <>
                      {menuItems[currentPage - 2] && renderDishCard(menuItems[currentPage - 2])}
                      {menuItems[currentPage - 1] && renderDishCard(menuItems[currentPage - 1])}
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="book-navigation">
          <button 
            onClick={() => flipPage('prev')}
            disabled={currentPage === 0 || isFlipping || !animationComplete}
            className="nav-button prev"
          >
            ←
          </button>
          <button 
            onClick={() => flipPage('next')}
            disabled={currentPage >= menuItems.length - 4 || isFlipping || !animationComplete}
            className="nav-button next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
} 