'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Offer {
  id: number
  title: string
  description: string
  image: string
  price: number
  oldPrice?: number
  endDate: string
  isSeasonSpecial: boolean
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'Дегустационный сет',
    description: '7 премиальных блюд от шефа с винным сопровождением',
    image: '/images/offers/tasting-menu.jpg',
    price: 12000,
    oldPrice: 15000,
    endDate: '2024-02-28',
    isSeasonSpecial: true
  },
  {
    id: 2,
    title: 'Романтический ужин',
    description: 'Особое меню для двоих с видом на город',
    image: '/images/offers/romantic-dinner.jpg',
    price: 8000,
    endDate: '2024-02-14',
    isSeasonSpecial: false
  },
  // Добавьте больше предложений здесь
]

export default function Offers() {
  const [timeLeft, setTimeLeft] = useState<{[key: string]: number}>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      
      const remaining = offers.reduce((acc, offer) => {
        const distance = new Date(offer.endDate).getTime() - now
        acc[offer.id] = Math.max(0, distance)
        return acc
      }, {} as {[key: string]: number})

      setTimeLeft(remaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  return (
    <section className="section-padding bg-gradient-to-b from-primary to-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Специальные предложения
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => {
            const time = formatTime(timeLeft[offer.id] || 0)
            
            return (
              <motion.div
                key={offer.id}
                className="relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-80">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {offer.isSeasonSpecial && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="bg-accent text-dark px-4 py-2 rounded-full font-playfair"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Сезонное предложение
                      </motion.div>
                    </div>
                  )}

                  <h3 className="text-2xl font-playfair mb-2">{offer.title}</h3>
                  <p className="text-gray-300 mb-4">{offer.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-playfair text-accent">
                      {offer.price} ₽
                    </span>
                    {offer.oldPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {offer.oldPrice} ₽
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-dark/50 p-2 rounded">
                      <div className="text-xl font-playfair text-accent">{time.days}</div>
                      <div className="text-xs">дней</div>
                    </div>
                    <div className="bg-dark/50 p-2 rounded">
                      <div className="text-xl font-playfair text-accent">{time.hours}</div>
                      <div className="text-xs">часов</div>
                    </div>
                    <div className="bg-dark/50 p-2 rounded">
                      <div className="text-xl font-playfair text-accent">{time.minutes}</div>
                      <div className="text-xs">минут</div>
                    </div>
                    <div className="bg-dark/50 p-2 rounded">
                      <div className="text-xl font-playfair text-accent">{time.seconds}</div>
                      <div className="text-xs">секунд</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 