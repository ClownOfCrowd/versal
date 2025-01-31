'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isRecommended?: boolean;
}

interface MenuPreorderProps {
  guestsCount: number;
  onOrderChange: (items: { itemId: number; quantity: number }[]) => void;
}

export default function MenuPreorder({ guestsCount, onOrderChange }: MenuPreorderProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderItems, setOrderItems] = useState<{ itemId: number; quantity: number }[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Тартар из тунца",
      description: "Свежий тунец с авокадо и цитрусовой заправкой",
      price: 1200,
      category: "закуски",
      image: "/images/menu/tuna-tartar.jpg",
      isRecommended: true
    },
    {
      id: 2,
      name: "Ризотто с трюфелем",
      description: "Кремовое ризотто с черным трюфелем и пармезаном",
      price: 1500,
      category: "горячее",
      image: "/images/menu/risotto.jpg",
      isRecommended: true
    },
    // Добавьте больше блюд
  ];

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const handleQuantityChange = (itemId: number, change: number) => {
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.itemId === itemId);
      if (existingItem) {
        const newQuantity = Math.max(0, existingItem.quantity + change);
        if (newQuantity === 0) {
          return prev.filter(item => item.itemId !== itemId);
        }
        return prev.map(item => 
          item.itemId === itemId ? { ...item, quantity: newQuantity } : item
        );
      }
      if (change > 0) {
        return [...prev, { itemId, quantity: 1 }];
      }
      return prev;
    });
  };

  const getItemQuantity = (itemId: number) => {
    return orderItems.find(item => item.itemId === itemId)?.quantity || 0;
  };

  const filteredItems = menuItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-accent text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isRecommended && (
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
                  Рекомендуем
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-playfair text-accent mb-2">{item.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-white">{item.price} ₽</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-white w-8 text-center">
                    {getItemQuantity(item.id)}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {orderItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-lg p-4 border-t border-white/10"
        >
          <div className="container-custom flex justify-between items-center">
            <div>
              <p className="text-white">Выбрано блюд: {orderItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-accent">
                Сумма: {orderItems.reduce((sum, item) => {
                  const menuItem = menuItems.find(mi => mi.id === item.itemId);
                  return sum + (menuItem?.price || 0) * item.quantity;
                }, 0)} ₽
              </p>
            </div>
            <button
              onClick={() => onOrderChange(orderItems)}
              className="btn-primary"
            >
              Подтвердить выбор
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 