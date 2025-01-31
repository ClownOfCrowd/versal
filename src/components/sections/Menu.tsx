'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: 'starters' | 'main' | 'desserts'
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Тартар из тунца',
    description: 'Свежий тунец с авокадо, каперсами и васаби',
    price: 2800,
    image: '/images/menu/tuna-tartar.jpg',
    category: 'starters'
  },
  {
    id: 2,
    name: 'Фуа-гра с инжиром',
    description: 'Утиная печень с карамелизированным инжиром',
    price: 3200,
    image: '/images/menu/foie-gras.jpg',
    category: 'starters'
  },
  // Добавьте больше блюд здесь
]

export default function Menu() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return

    setIsFlipping(true)
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1

    gsap.to(bookRef.current, {
      rotationY: direction === 'next' ? -180 : 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentPage(newPage)
        setIsFlipping(false)
      }
    })
  }

  const renderMenuItems = (category: MenuItem['category']) => {
    return menuItems
      .filter(item => item.category === category)
      .map(item => (
        <div key={item.id} className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-playfair">{item.name}</h3>
              <span className="text-accent">{item.price} ₽</span>
            </div>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        </div>
      ))
  }

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Меню
        </h2>

        <div className="relative perspective-1000">
          <div
            ref={bookRef}
            className="book-page bg-white/10 backdrop-blur-sm p-8 rounded-lg max-w-4xl mx-auto"
          >
            {currentPage === 0 && (
              <div className="page">
                <h3 className="text-2xl font-playfair text-accent mb-8">Закуски</h3>
                {renderMenuItems('starters')}
              </div>
            )}
            
            {/* Добавьте больше страниц здесь */}
          </div>

          {/* Кнопки навигации */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => flipPage('prev')}
              disabled={currentPage === 0}
              className="btn-primary disabled:opacity-50"
            >
              Назад
            </button>
            <button
              onClick={() => flipPage('next')}
              disabled={currentPage === 2}
              className="btn-primary disabled:opacity-50"
            >
              Вперед
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 