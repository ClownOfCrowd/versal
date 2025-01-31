'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Script from 'next/script';
import VideoBackground from '@/components/VideoBackground';
import CookbookMenu from '@/components/CookbookMenu';
import Reviews from '@/components/Reviews';
import HomeMenu from '@/components/HomeMenu';

const menuCategories = [
  { id: 'all', name: 'Все блюда' },
  { id: 'main', name: 'Основные блюда' },
  { id: 'appetizers', name: 'Закуски' },
  { id: 'desserts', name: 'Десерты' }
];

const menuItems = [
  {
    id: 1,
    name: 'Стейк Рибай',
    description: 'Сочный стейк из мраморной говядины с розмарином и чесночным маслом',
    price: '3200₽',
    category: 'main',
    image: '/images/menu/ribeye.jpg'
  },
  {
    id: 2,
    name: 'Тартар из тунца',
    description: 'Свежий тунец с авокадо, каперсами и цитрусовой заправкой',
    price: '1800₽',
    category: 'appetizers',
    image: '/images/menu/tuna-tartar.jpg'
  },
  {
    id: 3,
    name: 'Шоколадный фондан',
    description: 'Теплый шоколадный десерт с жидкой начинкой и ванильным мороженым',
    price: '950₽',
    category: 'desserts',
    image: '/images/menu/fondant.jpg'
  },
  {
    id: 4,
    name: 'Карпаччо из говядины',
    description: 'Тонко нарезанная говядина с рукколой, пармезаном и трюфельным маслом',
    price: '1500₽',
    category: 'appetizers',
    image: '/images/menu/carpaccio.jpg'
  },
  {
    id: 5,
    name: 'Палтус на гриле',
    description: 'Филе палтуса с овощами и соусом из белого вина',
    price: '2400₽',
    category: 'main',
    image: '/images/menu/halibut.jpg'
  },
  {
    id: 6,
    name: 'Крем-брюле',
    description: 'Классический французский десерт с карамельной корочкой',
    price: '850₽',
    category: 'desserts',
    image: '/images/menu/creme-brulee.jpg'
  }
];

const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/interior-1.jpg',
    alt: 'Интерьер ресторана',
    width: 600,
    height: 400
  },
  {
    id: 2,
    src: '/images/gallery/dish-1.jpg',
    alt: 'Фирменное блюдо',
    width: 400,
    height: 600
  },
  {
    id: 3,
    src: '/images/gallery/interior-2.jpg',
    alt: 'Уютная атмосфера',
    width: 600,
    height: 400
  },
  {
    id: 4,
    src: '/images/gallery/dish-2.jpg',
    alt: 'Изысканная подача',
    width: 400,
    height: 600
  },
  {
    id: 5,
    src: '/images/gallery/interior-3.jpg',
    alt: 'Вечерняя атмосфера',
    width: 600,
    height: 400
  },
  {
    id: 6,
    src: '/images/gallery/dish-3.jpg',
    alt: 'Десерт от шефа',
    width: 400,
    height: 600
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    comment: ''
  });
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const filteredMenu = menuItems.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      <VideoBackground />
      <Script 
        src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU" 
        strategy="lazyOnload"
      />
      <Navigation />
      
      {/* Hero секция */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '0 1rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <motion.h1 
              className="text-gradient"
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Versal
            </motion.h1>
            
            <motion.p 
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                marginBottom: '2rem',
                maxWidth: '32rem',
                margin: '0 auto 2rem',
                fontFamily: 'var(--font-lora)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Изысканная кухня в атмосфере роскоши и комфорта
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
            >
              <button 
                className="btn-primary"
                onClick={() => scrollToSection('contacts')}
              >
                Забронировать столик
              </button>
              <button 
                className="btn-outline"
                onClick={() => scrollToSection('menu')}
              >
                Меню
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* О нас */}
      <section 
        id="about" 
        ref={aboutRef}
        style={{ 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 1rem'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Изображение */}
          <motion.div 
            style={{ 
              position: 'relative',
              height: '500px',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/images/hero-poster.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                y
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent, rgba(26, 26, 26, 0.8))'
            }} />
          </motion.div>

          {/* Текстовый контент */}
          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              style={{
                width: '120px',
                height: '2px',
                background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                marginBottom: '2rem'
              }}
            />
            <motion.h2 
              className="text-gradient"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '2rem',
                fontFamily: 'var(--font-playfair)'
              }}
            >
              Традиции и инновации
            </motion.h2>
            <motion.p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.125rem',
                lineHeight: 1.8,
                marginBottom: '2rem'
              }}
            >
              Ресторан Versal — это уникальное сочетание классической кухни и современных кулинарных тенденций. Наши шеф-повара создают неповторимые блюда, в которых традиционные рецепты обретают новое звучание благодаря инновационным техникам приготовления и подачи.
            </motion.p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
              <div>
                <p style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: 'var(--font-playfair)',
                  background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>15+</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>лет опыта</p>
              </div>
              <div>
                <p style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: 'var(--font-playfair)',
                  background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>300+</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>рецептов</p>
              </div>
              <div>
                <p style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: 'var(--font-playfair)',
                  background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>50k+</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>гостей</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция меню */}
      <section id="menu" className="relative bg-dark/70 backdrop-blur-[2px]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-30"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/videos/menu-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <HomeMenu items={menuItems} categories={menuCategories} />
      </section>

      {/* Галерея */}
      <section 
        id="gallery"
        style={{ 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 1rem'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Заголовок секции */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <motion.div 
              style={{
                width: '120px',
                height: '2px',
                background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                margin: '0 auto 2rem'
              }}
            />
            <motion.h2 
              className="text-gradient"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair)'
              }}
            >
              Галерея
            </motion.h2>
            <motion.p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.125rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Погрузитесь в атмосферу нашего ресторана
            </motion.p>
          </motion.div>

          {/* Масонри галерея */}
          <div className="masonry-grid">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="masonry-item"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    position: 'relative',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    paddingTop: `${(image.height / image.width) * 100}%`
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.3s ease'
                    }} />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(26, 26, 26, 0.8), transparent)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem',
                        color: 'white',
                        fontFamily: 'var(--font-playfair)',
                        textAlign: 'center'
                      }}
                    >
                      {image.alt}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <Reviews />

      {/* Контакты */}
      <section 
        id="contacts"
        style={{ 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 1rem'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Заголовок секции */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <motion.div 
              style={{
                width: '120px',
                height: '2px',
                background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                margin: '0 auto 2rem'
              }}
            />
            <motion.h2
              className="text-gradient"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-playfair)'
              }}
            >
              Контакты
            </motion.h2>
            <motion.p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.125rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Забронируйте столик или свяжитесь с нами
            </motion.p>
          </motion.div>

          {/* Контактная секция */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'stretch'
          }}>
            {/* Форма бронирования */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <form onSubmit={handleSubmit} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '2rem',
                borderRadius: '1rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-playfair)',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  Забронировать столик
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Телефон"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num} style={{
                        background: '#1A1A1A',
                        color: 'white'
                      }}>
                        {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Комментарий к бронированию"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(226, 177, 91, 0.3)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Забронировать
                </button>
              </form>
            </motion.div>

            {/* Контактная информация и карта */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-playfair)',
                  marginBottom: '2rem',
                  background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  Как нас найти
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ 
                    color: '#E2B15B',
                    marginBottom: '0.5rem'
                  }}>Адрес:</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    г. Москва, ул. Примерная, д. 123
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ 
                    color: '#E2B15B',
                    marginBottom: '0.5rem'
                  }}>Телефон:</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    +7 (999) 123-45-67
                  </p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ 
                    color: '#E2B15B',
                    marginBottom: '0.5rem'
                  }}>Время работы:</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Пн-Вс: 12:00 - 23:00
                  </p>
                </div>
              </div>

              {/* Карта */}
              <div style={{
                flex: 1,
                minHeight: '300px',
                borderRadius: '1rem',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)'
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5947337749356!2d37.61591307675267!3d55.75798997335395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1709985163089!5m2!1sru!2sru"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: '4rem 1rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          position: 'relative',
          alignItems: 'start'
        }}>
          {/* Логотип и описание */}
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h4 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-playfair)',
              marginBottom: '1.5rem',
              color: '#E2B15B',
              height: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              О ресторане
            </h4>
            <div>
              <p style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-playfair)',
                background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '1rem',
                lineHeight: 1
              }}>
                Versal
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                fontSize: '0.875rem'
              }}>
                Изысканная кухня в атмосфере роскоши и комфорта. Мы создаем незабываемые впечатления для наших гостей.
              </p>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-playfair)',
              marginBottom: '1.5rem',
              color: '#E2B15B',
              height: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Навигация
            </h4>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {['О нас', 'Меню', 'Галерея', 'Контакты'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#E2B15B'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-playfair)',
              marginBottom: '1.5rem',
              color: '#E2B15B',
              height: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Контакты
            </h4>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <li style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                г. Москва, ул. Примерная, д. 123
              </li>
              <li>
                <a
                  href="tel:+79991234567"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E2B15B'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  +7 (999) 123-45-67
                </a>
              </li>
              <li style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Пн-Вс: 12:00 - 23:00
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h4 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-playfair)',
              marginBottom: '1.5rem',
              color: '#E2B15B',
              height: '24px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Социальные сети
            </h4>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {['VK', 'Telegram', 'WhatsApp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E2B15B'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '3rem',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.4)'
        }}>
          © {new Date().getFullYear()} Ресторан Versal. Все права защищены.
        </div>
      </footer>

      {/* Кнопка "Наверх" */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #E2B15B, #C89B3C)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(226, 177, 91, 0.3)',
          zIndex: 100
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4L3 11H17L10 4Z"
            fill="#1A1A1A"
          />
        </svg>
      </motion.button>
    </main>
  );
}
