'use client';

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';

// Ленивая загрузка мобильного меню
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
  loading: () => null
});

// Анимации для мобильного меню
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

// Мемоизированный компонент ссылки навигации
const NavLink = memo(({ href, label, isActive, onClick }: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-sm uppercase tracking-wider transition-colors relative ${
      isActive
        ? 'text-accent'
        : 'text-white hover:text-accent'
    }`}
  >
    {label}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
        layoutId="underline"
        transition={{ duration: 0.2 }}
      />
    )}
  </Link>
));

NavLink.displayName = 'NavLink';

const navLinks = [
  { href: '/menu', label: 'Меню' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/blog', label: 'Блог' },
  { href: '/reservation', label: 'Бронирование' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTransparentPage = ['/', '/reservation', '/menu', '/gallery', '/blog'].includes(pathname);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Оптимизированный обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 50);
          if (currentScrollY > lastScrollY.current && isOpen) {
            setIsOpen(false);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Блокируем скролл при открытом мобильном меню
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isOpen, isMobile]);

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-dark/80 backdrop-blur-lg py-4'
          : 'bg-transparent py-6'
      }`}
      initial={false}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-playfair text-white hover:text-accent transition-colors relative z-50"
            onClick={() => setIsOpen(false)}
          >
            Versal
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          {/* Mobile Navigation Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none md:hidden"
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <div className="relative w-6 h-4">
                <motion.span
                  className="absolute w-full h-0.5 bg-white transform"
                  animate={{ 
                    top: isOpen ? '50%' : '0%',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    y: isOpen ? '-50%' : '0'
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-full h-0.5 bg-white transform"
                  animate={{ 
                    bottom: isOpen ? '50%' : '0%',
                    transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                    y: isOpen ? '50%' : '0'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <MobileMenu
          isOpen={isOpen}
          navLinks={navLinks}
          pathname={pathname}
          onClose={handleCloseMenu}
          variants={{
            open: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
                ease: 'easeOut'
              }
            },
            closed: {
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }
          }}
        />
      )}
    </motion.header>
  );
} 