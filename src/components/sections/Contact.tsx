'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ContactInfo {
  address: string
  phone: string
  email: string
  workingHours: {
    days: string
    hours: string
  }[]
  socialMedia: {
    platform: string
    url: string
    icon: string
  }[]
}

const contactInfo: ContactInfo = {
  address: 'ул. Пушкина, д. 10, Москва',
  phone: '+7 (999) 123-45-67',
  email: 'info@luxury-restaurant.ru',
  workingHours: [
    { days: 'Пн-Чт', hours: '12:00 - 23:00' },
    { days: 'Пт-Сб', hours: '12:00 - 00:00' },
    { days: 'Вс', hours: '13:00 - 23:00' }
  ],
  socialMedia: [
    { platform: 'Instagram', url: 'https://instagram.com', icon: '/images/social/instagram.svg' },
    { platform: 'Facebook', url: 'https://facebook.com', icon: '/images/social/facebook.svg' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: '/images/social/twitter.svg' }
  ]
}

export default function Contact() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Здесь будет инициализация карты (например, Google Maps или Yandex Maps)
    // В реальном приложении нужно добавить API ключ и настройки карты
  }, [])

  const handleCallTaxi = () => {
    // Здесь будет интеграция с сервисом такси
    alert('Вызов такси...')
  }

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Контакты
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Карта */}
          <div className="h-[400px] bg-white/10 rounded-lg" ref={mapRef}>
            {/* Здесь будет карта */}
          </div>

          {/* Контактная информация */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-playfair text-accent mb-4">Адрес</h3>
              <p className="text-gray-300">{contactInfo.address}</p>
              <button
                onClick={handleCallTaxi}
                className="btn-accent mt-4"
              >
                Вызвать такси
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-playfair text-accent mb-4">Часы работы</h3>
              <div className="space-y-2">
                {contactInfo.workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-300">{schedule.days}</span>
                    <span className="text-accent">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-playfair text-accent mb-4">Связаться с нами</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Телефон: <a href={`tel:${contactInfo.phone}`} className="text-accent hover:text-white">
                    {contactInfo.phone}
                  </a>
                </p>
                <p className="text-gray-300">
                  Email: <a href={`mailto:${contactInfo.email}`} className="text-accent hover:text-white">
                    {contactInfo.email}
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-6"
            >
              {contactInfo.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-white transition-colors"
                >
                  <img
                    src={social.icon}
                    alt={social.platform}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 