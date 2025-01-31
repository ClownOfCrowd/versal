'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({ size = 24, color = 'currentColor' }: LoadingSpinnerProps) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        className="block absolute inset-0"
        style={{
          border: `2px solid ${color}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.span
        className="block absolute inset-0"
        style={{
          border: `2px solid ${color}`,
          borderRadius: '50%',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          opacity: 0.5,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
} 