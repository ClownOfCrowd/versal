'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Table {
  id: number;
  seats: number;
  x: number;
  y: number;
  isWindow: boolean;
  isVip: boolean;
  isAvailable: boolean;
}

interface TableMapProps {
  onSelect: (tableId: number) => void;
  selectedDate: Date;
  selectedTime: string;
}

export default function TableMap({ onSelect, selectedDate, selectedTime }: TableMapProps) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Моковые данные столиков
  const tables: Table[] = [
    { id: 1, seats: 2, x: 10, y: 10, isWindow: true, isVip: false, isAvailable: true },
    { id: 2, seats: 4, x: 120, y: 10, isWindow: true, isVip: false, isAvailable: true },
    { id: 3, seats: 6, x: 230, y: 10, isWindow: true, isVip: false, isAvailable: false },
    { id: 4, seats: 2, x: 10, y: 120, isWindow: false, isVip: false, isAvailable: true },
    { id: 5, seats: 4, x: 120, y: 120, isWindow: false, isVip: true, isAvailable: true },
    { id: 6, seats: 8, x: 230, y: 120, isWindow: false, isVip: true, isAvailable: true },
  ];

  const handleTableClick = (table: Table) => {
    if (!table.isAvailable) return;
    
    setSelectedTable(table.id);
    onSelect(table.id);
  };

  const getTableColor = (table: Table) => {
    if (!table.isAvailable) return 'bg-gray-400';
    if (table.id === selectedTable) return 'bg-accent';
    if (table.id === hoveredTable) return 'bg-accent/70';
    if (table.isVip) return 'bg-purple-600';
    return 'bg-primary';
  };

  const tableVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const legendVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl mx-auto bg-dark/50 backdrop-blur-sm rounded-xl p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 text-sm text-gray-400"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Окна ↑
        </motion.span>
      </motion.div>
      
      <div className="relative h-[300px]">
        <AnimatePresence>
          {tables.map((table, index) => (
            <motion.div
              key={table.id}
              custom={index}
              variants={tableVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              whileHover={table.isAvailable ? "hover" : undefined}
              whileTap={table.isAvailable ? "tap" : undefined}
              style={{
                position: 'absolute',
                left: table.x,
                top: table.y,
                width: table.seats <= 2 ? 80 : table.seats <= 4 ? 100 : 120,
                height: table.seats <= 2 ? 80 : table.seats <= 4 ? 100 : 120,
              }}
              className={`
                ${getTableColor(table)}
                rounded-lg cursor-pointer transition-all duration-300
                ${!table.isAvailable && 'opacity-50 cursor-not-allowed'}
                ${table.id === selectedTable && 'ring-4 ring-accent ring-opacity-50'}
              `}
              onClick={() => handleTableClick(table)}
              onHoverStart={() => setHoveredTable(table.id)}
              onHoverEnd={() => setHoveredTable(null)}
              layoutId={`table-${table.id}`}
            >
              <motion.div
                className="text-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className="font-medium"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {table.seats} места
                </motion.div>
                <motion.div
                  className="text-sm opacity-75"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {table.isVip ? 'VIP' : table.isWindow ? 'У окна' : 'Стандарт'}
                </motion.div>
                {!table.isAvailable && (
                  <motion.div
                    className="text-xs mt-1 text-red-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    Занят
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 grid grid-cols-3 gap-4 text-sm"
      >
        {[
          { color: 'bg-primary', label: 'Доступен' },
          { color: 'bg-purple-600', label: 'VIP' },
          { color: 'bg-gray-400', label: 'Занят' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            custom={index}
            variants={legendVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className={`w-4 h-4 ${item.color} rounded`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <span>{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 