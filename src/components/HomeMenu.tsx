'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

interface HomeMenuProps {
  items: MenuItem[];
  categories: Array<{ id: string; name: string }>;
}

const MenuCard = ({ item, isMobile, isTablet }: { 
  item: MenuItem; 
  isMobile: boolean;
  isTablet: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.4 }}
    className={`bg-dark/50 backdrop-blur-sm rounded-lg overflow-hidden group h-full ${
      isMobile ? 'w-full' : ''
    }`}
  >
    <div className="relative h-48 md:h-64 overflow-hidden">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes={
          isMobile
            ? '100vw'
            : isTablet
            ? '50vw'
            : '33vw'
        }
        priority={isMobile}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
    </div>
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <h3 className="text-lg md:text-xl font-playfair text-white group-hover:text-accent transition-colors">
          {item.name}
        </h3>
        <span className="text-accent font-playfair text-base md:text-lg whitespace-nowrap ml-2">
          {item.price}
        </span>
      </div>
      <p className="text-gray-400 text-xs md:text-sm line-clamp-2">
        {item.description}
      </p>
    </div>
  </motion.div>
);

export default function HomeMenu({ items, categories }: HomeMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = items.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  if (!mounted) return null;

  return (
    <div className="w-full py-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <motion.div 
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
              margin: '0 auto 2rem'
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.h2
            className="text-gradient"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-playfair)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Наше меню
          </motion.h2>
          <motion.p
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Откройте для себя изысканный мир вкусов в нашем ресторане
          </motion.p>
        </div>

        {/* Категории */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-dark/50 text-white/80 hover:bg-dark/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Сетка блюд для десктопа / Слайдер для мобильных */}
        {isMobile ? (
          <Swiper
            modules={[Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="w-full !px-0 !py-8"
            style={{
              '--swiper-navigation-color': '#E2B15B',
              '--swiper-pagination-color': '#E2B15B',
            } as any}
          >
            {filteredItems.map((item) => (
              <SwiperSlide 
                key={item.id} 
                className="w-[85%] flex items-center justify-center"
                style={{ width: '85%' }}
              >
                <MenuCard item={item} isMobile={isMobile} isTablet={isTablet} />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev !text-accent after:!text-lg"></div>
            <div className="swiper-button-next !text-accent after:!text-lg"></div>
          </Swiper>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  isMobile={isMobile} 
                  isTablet={isTablet} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 