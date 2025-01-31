'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost, AIResponse } from './types';
import { getAllPosts } from './blogData';
import { generateAIResponse, getRandomGreeting } from './aiAssistant';
import Navigation from '../../components/Navigation';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogPosts(getAllPosts());
    setGreeting(getRandomGreeting());
  }, []);

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAiQuery = async () => {
    setIsLoading(true);
    try {
      const response = await generateAIResponse(aiQuery);
      setAiResponse(response);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="container-custom py-24">
        <h1 className="text-4xl md:text-5xl font-playfair text-center mb-4 text-white">
          Блог Versal
        </h1>
        <p className="text-lg text-center text-gray-300 mb-16">
          Кулинарные истории, советы и рекомендации от наших экспертов и VersalAI
        </p>

        {/* AI-помощник */}
        <div className="bg-white/5 p-6 rounded-lg mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-playfair text-accent">
                VersalAI
              </h2>
              <p className="text-gray-300">{greeting}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Задайте вопрос о рецептах, винах или получите персональные рекомендации..."
              className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleAiQuery}
              disabled={isLoading || !aiQuery}
              className="btn-primary"
            >
              {isLoading ? "Анализирую..." : "Спросить"}
            </button>
          </div>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-4"
            >
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="text-gray-300 mb-4">{aiResponse.text}</p>
                {aiResponse.personalNote && (
                  <p className="text-accent italic">{aiResponse.personalNote}</p>
                )}
              </div>

              {aiResponse.suggestions && aiResponse.suggestions.length > 0 && (
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="text-accent mb-2">Рекомендованные статьи:</h4>
                  <ul className="space-y-2">
                    {aiResponse.suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-accent transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiResponse.relatedPosts && aiResponse.relatedPosts.length > 0 && (
                <div className="p-4 bg-white/10 rounded-lg">
                  <h4 className="text-accent mb-2">Похожие статьи:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aiResponse.relatedPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => setSelectedPost(post)}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h5 className="text-accent">{post.title}</h5>
                          <p className="text-sm text-gray-400">{post.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Фильтры и поиск */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по статьям..."
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Список постов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {post.aiGenerated && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
                    AI
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent text-sm">{post.category}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">{post.readingTime}</span>
                </div>
                <h3 className="text-xl font-playfair text-accent mb-2 group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{post.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{post.likes}</span>
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Модальное окно с полным постом */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-dark rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-playfair text-accent mb-2">
                      {selectedPost.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-accent">{selectedPost.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{selectedPost.readingTime}</span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-accent">{selectedPost.likes}</span>
                        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-white hover:text-accent transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden group">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {selectedPost.aiGenerated && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full">
                      Создано с помощью AI
                    </div>
                  )}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedPost.content}
                  </p>
                  
                  {selectedPost.ingredients && (
                    <div className="bg-white/5 rounded-lg p-6 mb-6">
                      <h4 className="text-accent text-xl mb-4">Ингредиенты:</h4>
                      <ul className="grid grid-cols-2 gap-4">
                        {selectedPost.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedPost.aiGenerated && selectedPost.aiResponse && (
                    <div className="bg-white/5 rounded-lg p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-accent text-xl">Рекомендации VersalAI:</h4>
                      </div>
                      <p className="text-gray-300">{selectedPost.aiResponse}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <button className="btn-primary">
                      Поделиться
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                      Сохранить
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-playfair text-lg">
                          {selectedPost.author[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-accent">{selectedPost.author}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(selectedPost.date).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Поделились:</span>
                      <span className="text-accent">43</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 