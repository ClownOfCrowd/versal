'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const guests = searchParams.get('guests');
  const name = searchParams.get('name');

  const detailsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  };

  return (
    <div className="min-h-screen bg-dark text-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center mb-6"
            >
              <motion.svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-playfair mb-4"
            >
              Бронирование подтверждено!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-300"
            >
              Спасибо за выбор ресторана Versal. Мы с нетерпением ждём встречи с вами!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="bg-white/5 rounded-xl p-8 mb-8 backdrop-blur-sm"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-playfair mb-6"
            >
              Детали бронирования
            </motion.h2>
            <div className="grid grid-cols-2 gap-6 text-left">
              <motion.div
                custom={0}
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-gray-400 mb-1">Имя</p>
                <p className="text-xl">{name}</p>
              </motion.div>
              <motion.div
                custom={1}
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-gray-400 mb-1">Дата</p>
                <p className="text-xl">{date}</p>
              </motion.div>
              <motion.div
                custom={2}
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-gray-400 mb-1">Время</p>
                <p className="text-xl">{time}</p>
              </motion.div>
              <motion.div
                custom={3}
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-gray-400 mb-1">Гости</p>
                <p className="text-xl">{guests} чел.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-gray-300"
            >
              Мы отправили подтверждение на ваш email. <br />
              Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами:
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="tel:+79001234567"
                className="text-xl text-accent hover:text-accent/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                +7 (900) 123-45-67
              </motion.a>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/menu"
                className="btn-outline inline-block"
              >
                Посмотреть меню
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 