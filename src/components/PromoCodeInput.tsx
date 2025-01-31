'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
  type: 'percent' | 'fixed';
}

interface PromoCodeInputProps {
  onApply: (discount: number) => void;
}

export default function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Моковые промокоды
  const promoCodes: PromoCode[] = [
    {
      code: 'WELCOME',
      discount: 10,
      description: 'Скидка 10% на первое посещение',
      type: 'percent'
    },
    {
      code: 'BIRTHDAY',
      discount: 1000,
      description: 'Скидка 1000₽ в день рождения',
      type: 'fixed'
    },
    // Добавьте больше промокодов
  ];

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Имитация запроса к серверу
    setTimeout(() => {
      const promoCode = promoCodes.find(
        promo => promo.code.toLowerCase() === code.toLowerCase()
      );

      if (promoCode) {
        setSuccess(
          `${promoCode.description} (${
            promoCode.type === 'percent' ? promoCode.discount + '%' : promoCode.discount + '₽'
          })`
        );
        onApply(promoCode.discount);
      } else {
        setError('Промокод не найден');
      }

      setIsLoading(false);
    }, 1000);
  };

  const messageVariants = {
    initial: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2"
      >
        <motion.input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Введите промокод"
          className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent uppercase"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        <motion.button
          onClick={handleSubmit}
          disabled={!code || isLoading}
          className="btn-primary min-w-[120px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size={16} />
              Проверяю
            </span>
          ) : (
            'Применить'
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center gap-2 text-red-500 text-sm"
          >
            <svg
              className="w-4 h-4"
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
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            key="success"
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center gap-2 text-green-500 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 