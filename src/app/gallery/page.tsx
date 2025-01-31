'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Share2, Download, Info } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'vip' | 'main' | 'bar' | 'wine' | 'dishes' | 'events';
  width: number;
  height: number;
  priority?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'VIP-зал "Империал"',
    description: 'Роскошный зал для особых мероприятий с панорамным видом на город',
    image: '/images/gallery/vip-1.jpg',
    category: 'vip',
    width: 1920,
    height: 1080
  },
  // Здесь будут добавлены остальные элементы после загрузки изображений
];

const categories = [
  { id: 'all', label: 'Все', icon: '🎯' },
  { id: 'vip', label: 'VIP-залы', icon: '👑' },
  { id: 'main', label: 'Основной зал', icon: '🏰' },
  { id: 'bar', label: 'Бар', icon: '🥂' },
  { id: 'wine', label: 'Винный погреб', icon: '🍷' },
  { id: 'dishes', label: 'Блюда', icon: '✨' },
  { id: 'events', label: 'Мероприятия', icon: '🎉' }
];

interface ShareData {
  title: string;
  text: string;
  url: string;
}

interface VideoBackgroundProps {
  videoUrl: string;
}

const VideoBackground = ({ videoUrl }: VideoBackgroundProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [showInfo, setShowInfo] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const headerY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -50]), springConfig);
  const headerOpacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0]), springConfig);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    
    if (e.key === 'ArrowRight' && currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, [selectedImage, filteredItems]);

  const handleShare = async (item: GalleryItem) => {
    const shareData: ShareData = {
      title: item.title,
      text: item.description,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback для браузеров без поддержки Web Share API
        await navigator.clipboard.writeText(window.location.href);
        // Здесь можно добавить уведомление о копировании ссылки
      }
    } catch (error) {
      console.error('Ошибка при попытке поделиться:', error);
    }
  };

  const onImageLoad = (id: number) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark/50 relative">
      {/* Видео-фон */}
      <VideoBackground videoUrl="/videos/gallery-background.mp4" />

      {/* Фоновый паттерн с параллакс-эффектом поверх видео */}
      <motion.div 
        className="fixed inset-0 z-1 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: 'url(/images/pattern.png)',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          y: useTransform(scrollYProgress, [0, 1], [0, 100])
        }}
      />

      {/* Заголовок с улучшенными анимациями */}
      <motion.div 
        className="relative z-10 pt-32 pb-16 text-center"
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <motion.h1 
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          Галерея
        </motion.h1>
        <motion.p
          className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto px-4 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Погрузитесь в атмосферу роскоши и изысканности нашего ресторана
        </motion.p>
      </motion.div>

      {/* Фильтры категорий с прозрачным фоном */}
      <motion.div 
        className="sticky top-20 z-20 py-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm transition-all flex items-center gap-2 backdrop-blur-sm ${
                  selectedCategory === category.id
                    ? 'bg-accent/90 text-white shadow-lg shadow-accent/20'
                    : 'bg-white/5 text-gray-200 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Галерея с улучшенной загрузкой */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-item-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: loadedImages.has(item.id) ? 1 : 0,
                y: loadedImages.has(item.id) ? 0 : 20
              }}
              transition={{ 
                delay: index * 0.1,
                layout: { duration: 0.6 }
              }}
              className="relative group cursor-pointer"
              onClick={() => {
                setSelectedImage(item);
                setCurrentImageIndex(index);
              }}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={
                    isMobile
                      ? '100vw'
                      : isTablet
                      ? '50vw'
                      : '33vw'
                  }
                  priority={item.priority}
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onLoadingComplete={() => onImageLoad(item.id)}
                />
                <motion.div 
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.h3 
                      className="text-xl font-playfair text-white mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-200 text-sm"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Модальное окно для просмотра изображений */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              initialSlide={currentImageIndex}
              onSlideChange={(swiper) => {
                setSelectedImage(filteredItems[swiper.activeIndex]);
              }}
              className="w-full max-w-7xl"
            >
              {filteredItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    className="relative max-w-7xl w-full bg-dark rounded-lg overflow-hidden"
                    onClick={e => e.stopPropagation()}
                    layoutId={`gallery-item-${item.id}`}
                  >
                    <div className="relative aspect-[16/9] group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        quality={100}
                        priority
                      />
                      {/* Панель управления */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(item);
                              }}
                              className="text-white hover:text-accent transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm"
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Здесь можно добавить логику для скачивания
                              }}
                              className="text-white hover:text-accent transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowInfo(!showInfo);
                              }}
                              className="text-white hover:text-accent transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm"
                            >
                              <Info className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {/* Информация о фото */}
                    <AnimatePresence>
                      {showInfo && (
                        <motion.div 
                          className="p-6 bg-dark/80 backdrop-blur-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          <h3 className="text-2xl font-playfair text-accent mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-300 mb-4">
                            {item.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                            <div>
                              <span className="block text-gray-500">Размер</span>
                              {item.width} x {item.height}
                            </div>
                            <div>
                              <span className="block text-gray-500">Категория</span>
                              {categories.find(cat => cat.id === item.category)?.label}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Кнопки навигации */}
            <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                  if (currentIndex > 0) {
                    setSelectedImage(filteredItems[currentIndex - 1]);
                  }
                }}
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:text-accent transition-colors pointer-events-auto"
                disabled={filteredItems.findIndex(item => item.id === selectedImage.id) === 0}
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
                  if (currentIndex < filteredItems.length - 1) {
                    setSelectedImage(filteredItems[currentIndex + 1]);
                  }
                }}
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:text-accent transition-colors pointer-events-auto"
                disabled={filteredItems.findIndex(item => item.id === selectedImage.id) === filteredItems.length - 1}
              >
                →
              </button>
            </div>
            {/* Кнопка закрытия */}
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 