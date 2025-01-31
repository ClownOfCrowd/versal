'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    text: 'Превосходный ресторан! Атмосфера роскоши и уюта, безупречное обслуживание. Особенно впечатлило разнообразие винной карты и профессионализм сомелье.',
    date: '15.03.2024'
  },
  {
    id: 2,
    name: 'Михаил Соколов',
    rating: 5,
    text: 'Идеальное место для особых случаев. Шеф-повар творит настоящие кулинарные шедевры. Каждое блюдо - это произведение искусства!',
    date: '10.03.2024'
  },
  {
    id: 3,
    name: 'Елена Волкова',
    rating: 5,
    text: 'Великолепная кухня, внимательный персонал и потрясающий интерьер. Отдельное спасибо за романтическую атмосферу и живую музыку.',
    date: '05.03.2024'
  },
  {
    id: 4,
    name: 'Дмитрий Иванов',
    rating: 5,
    text: 'Потрясающий вечер в атмосфере роскоши. Блюда приготовлены с особым вниманием к деталям, а обслуживание на высшем уровне.',
    date: '01.03.2024'
  },
  {
    id: 5,
    name: 'Мария Сидорова',
    rating: 5,
    text: 'Отмечали здесь годовщину свадьбы. Все было просто великолепно! Особенно впечатлил индивидуальный подход и внимание к деталям.',
    date: '28.02.2024'
  }
];

interface ReviewFormData {
  name: string;
  email: string;
  phone: string;
  rating: number;
  text: string;
}

export default function Reviews() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    email: '',
    phone: '',
    rating: 5,
    text: ''
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 5000); // Меняем слайды каждые 5 секунд

      return () => clearInterval(timer);
    }
  }, [totalPages, isPaused]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки отзыва
    console.log(formData);
    setIsFormOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      rating: 5,
      text: ''
    });
  };

  const inputClasses = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:bg-black/30";
  const labelClasses = "block text-gray-200 text-sm font-medium font-lora mb-2";

  const visibleReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-gradient text-3xl md:text-4xl font-playfair mb-6">
            Отзывы наших гостей
          </h2>
          <p className="text-gray-300 text-lg font-lora">
            Мы ценим каждое мнение и стремимся стать лучше для вас
          </p>
        </motion.div>

        <div className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence mode="wait">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-lg font-playfair">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-accent' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-300 font-lora">{review.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Навигация слайдера */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-accent transition-colors"
            >
              <FaChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPage === index ? 'bg-accent w-6' : 'bg-white/20'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 rounded-full bg-black/40 border border-white/10 text-white/80 hover:text-accent transition-colors"
            >
              <FaChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="text-center mt-12">
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary px-8 py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Оставить отзыв
          </motion.button>
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsFormOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900/95 rounded-2xl p-6 md:p-8 w-full max-w-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-playfair text-gradient mb-6 text-center">
                  Оставить отзыв
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={labelClasses}>Ваше имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClasses}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Телефон</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Оценка</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <motion.button
                          key={rating}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFormData({ ...formData, rating })}
                          onMouseEnter={() => setHoverRating(rating)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="text-2xl focus:outline-none"
                        >
                          <FaStar
                            className={`w-8 h-8 transition-colors ${
                              (hoverRating !== null
                                ? rating <= hoverRating
                                : rating <= formData.rating)
                                ? 'text-accent'
                                : 'text-gray-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Ваш отзыв</label>
                    <textarea
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className={`${inputClasses} resize-none`}
                      placeholder="Поделитесь вашими впечатлениями"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="btn-outline px-6 py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Отмена
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="btn-primary px-6 py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Отправить
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 