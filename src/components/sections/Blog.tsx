'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
}

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'Искусство французской кухни',
    excerpt: 'Погружение в традиции и современные интерпретации классических рецептов',
    content: 'Французская кухня - это не просто еда, это целая философия...',
    image: '/images/blog/french-cuisine.jpg',
    date: '2024-01-29',
    author: 'Шеф Андрей Петров'
  },
  {
    id: 2,
    title: 'Сезонные ингредиенты весны',
    excerpt: 'Как использовать свежие весенние продукты в высокой кухне',
    content: 'Весна - особенное время для шеф-поваров...',
    image: '/images/blog/spring-ingredients.jpg',
    date: '2024-01-28',
    author: 'Су-шеф Мария Иванова'
  },
  // Добавьте больше постов здесь
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  // В реальном приложении здесь будет интеграция с OpenAI API
  const generateNewPost = async () => {
    // Имитация генерации поста
    const newPost: BlogPost = {
      id: posts.length + 1,
      title: 'Новый AI-сгенерированный пост',
      excerpt: 'Этот пост был создан с помощью искусственного интеллекта',
      content: 'Здесь будет сгенерированный контент...',
      image: '/images/blog/ai-generated.jpg',
      date: new Date().toISOString().split('T')[0],
      author: 'AI Assistant'
    }

    setPosts([newPost, ...posts])
  }

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair">
            Кулинарный блог
          </h2>
          <button
            onClick={generateNewPost}
            className="btn-accent"
          >
            Создать новый пост
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/5 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center text-sm text-accent mb-2">
                  <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                  <span>{post.author}</span>
                </div>
                
                <h3 className="text-xl font-playfair mb-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-accent hover:text-white transition-colors"
                >
                  Читать далее →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Модальное окно для полного поста */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-dark rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-playfair text-accent">
                  {selectedPost.title}
                </h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white hover:text-accent"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-64 mb-6">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{selectedPost.content}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-accent">
                <p>Автор: {selectedPost.author}</p>
                <p>Опубликовано: {new Date(selectedPost.date).toLocaleDateString('ru-RU')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 