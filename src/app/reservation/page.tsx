'use client';

import { motion } from 'framer-motion';
import ReservationForm from '@/components/ReservationForm';

export default function ReservationPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-16">
      {/* Фоновое изображение с затемнением */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: 'url(/images/restaurant-bg.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Контент */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gradient text-3xl md:text-4xl lg:text-5xl font-playfair mb-6"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-playfair)',
              lineHeight: '1.2'
            }}
          >
            Забронировать столик
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
              fontFamily: 'var(--font-lora)'
            }}
          >
            Доверьте нам организацию вашего особенного вечера
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
            <ReservationForm />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 text-lg" style={{ fontFamily: 'var(--font-lora)' }}>
            Для особых пожеланий:{' '}
            <motion.a
              href="tel:+7(123)456-78-90"
              className="text-accent hover:text-accent/80 transition-colors inline-block font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              +7 (123) 456-78-90
            </motion.a>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 