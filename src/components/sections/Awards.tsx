'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Award {
  id: number
  title: string
  description: string
  image: string
  year: number
  issuer: string
}

const awards: Award[] = [
  {
    id: 1,
    title: 'Мишлен',
    description: 'Две звезды Мишлен за выдающиеся кулинарные достижения',
    image: '/images/awards/michelin.jpg',
    year: 2023,
    issuer: 'Michelin Guide'
  },
  {
    id: 2,
    title: 'Лучший ресторан года',
    description: 'Премия за инновации в высокой кухне',
    image: '/images/awards/restaurant-of-the-year.jpg',
    year: 2023,
    issuer: 'World Restaurant Awards'
  },
  // Добавьте больше наград здесь
]

export default function Awards() {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null)

  return (
    <section className="section-padding bg-gradient-to-b from-dark to-primary">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Наши награды
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {awards.map((award) => (
            <motion.div
              key={award.id}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedAward(award)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl font-playfair text-accent">{award.title}</h3>
                <p className="text-sm text-gray-300">{award.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Модальное окно с детальной информацией */}
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <div className="bg-dark rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-playfair text-accent">
                  {selectedAward.title}
                </h3>
                <button
                  onClick={() => setSelectedAward(null)}
                  className="text-white hover:text-accent"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={selectedAward.image}
                  alt={selectedAward.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-gray-300">{selectedAward.description}</p>
                <div className="flex justify-between text-sm text-accent">
                  <span>Выдано: {selectedAward.issuer}</span>
                  <span>Год: {selectedAward.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 