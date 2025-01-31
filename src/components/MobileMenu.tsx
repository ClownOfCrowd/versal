'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: Array<{ href: string; label: string }>;
  pathname: string;
  onClose: () => void;
  variants: {
    open: any;
    closed: any;
  };
}

// Локальная версия NavLink для мобильного меню
const NavLink = memo(({ href, label, isActive, onClick }: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-xl uppercase tracking-wider transition-colors relative ${
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

const MobileMenu = memo(function MobileMenu({
  isOpen,
  navLinks,
  pathname,
  onClose,
  variants
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial="closed"
          animate="open"
          exit="closed"
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
          className="fixed inset-x-0 top-0 h-screen bg-dark/95 backdrop-blur-xl md:hidden z-40"
        >
          <div className="container mx-auto px-4 pt-24 h-full">
            <div className="flex flex-col items-center justify-start space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  <NavLink
                    href={link.href}
                    label={link.label}
                    isActive={pathname === link.href}
                    onClick={() => {
                      onClose();
                      // Добавляем небольшую задержку перед закрытием
                      setTimeout(onClose, 300);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu; 