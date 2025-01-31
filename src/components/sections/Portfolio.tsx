'use client'

import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import Image from 'next/image'

interface DishItem {
  id: number
  name: string
  description: string
  image: string
  ingredients: string[]
}

const dishes: DishItem[] = [
  {
    id: 1,
    name: 'Филе миньон',
    description: 'Нежнейшее мясо с трюфельным соусом',
    image: '/images/portfolio/filet-mignon.jpg',
    ingredients: ['Говядина премиум', 'Трюфель', 'Соус демиглас', 'Микрозелень']
  },
  {
    id: 2,
    name: 'Лобстер термидор',
    description: 'Запеченный лобстер в сливочном соусе',
    image: '/images/portfolio/lobster.jpg',
    ingredients: ['Лобстер', 'Сливочный соус', 'Пармезан', 'Эстрагон']
  },
  // Добавьте больше блюд здесь
]

function DishModel({ imagePath }: { imagePath: string }) {
  const texture = useTexture(imagePath)
  
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default function Portfolio() {
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="section-padding bg-gradient-to-b from-dark to-primary">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
          Наши шедевры
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedDish(dish)}
            >
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-playfair text-white mb-2">{dish.name}</h3>
                <p className="text-accent text-center px-4">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно с 3D просмотром */}
        {selectedDish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-dark rounded-lg p-6 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-playfair text-accent">{selectedDish.name}</h3>
                <button
                  onClick={() => setSelectedDish(null)}
                  className="text-white hover:text-accent"
                >
                  ✕
                </button>
              </div>

              <div className="h-96 mb-6">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 2.5]} />
                  <OrbitControls enableZoom={false} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <DishModel imagePath={selectedDish.image} />
                </Canvas>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-playfair text-accent mb-2">Описание</h4>
                  <p className="text-gray-300">{selectedDish.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-playfair text-accent mb-2">Ингредиенты</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 