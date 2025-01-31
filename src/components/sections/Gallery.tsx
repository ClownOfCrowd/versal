'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/images/gallery/interior-1.jpg',
    title: 'Основной зал',
    description: 'Элегантный интерьер с панорамными окнами и видом на город'
  },
  {
    id: 2,
    image: '/images/gallery/dish-1.jpg',
    title: 'Авторская кухня',
    description: 'Изысканные блюда от нашего шеф-повара'
  },
  {
    id: 3,
    image: '/images/gallery/wine-room.jpg',
    title: 'Винный погреб',
    description: 'Коллекция редких вин со всего мира'
  },
  {
    id: 4,
    image: '/images/gallery/terrace.jpg',
    title: 'Летняя терраса',
    description: 'Уютное пространство под открытым небом'
  },
  {
    id: 5,
    image: '/images/gallery/bar.jpg',
    title: 'Барная стойка',
    description: 'Авторские коктейли и премиальные напитки'
  },
  {
    id: 6,
    image: '/images/gallery/private-room.jpg',
    title: 'VIP-зал',
    description: 'Отдельный зал для особых случаев'
  }
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-4">
          Галерея
        </h2>
        <p className="text-lg text-center text-gray-300 mb-16">
          Погрузитесь в атмосферу нашего ресторана
        </p>
        
        <div className="masonry-grid">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="masonry-item relative group"
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial="initial"
              whileHover="hover"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <h3 className="text-xl font-playfair text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}