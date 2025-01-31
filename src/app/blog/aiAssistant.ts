import { AIResponse, AIPersonality, BlogPost } from './types';
import { aiPosts, manualPosts } from './blogData';

const versalAI: AIPersonality = {
  name: 'VersalAI',
  role: 'Кулинарный AI-ассистент',
  specialties: ['Французская кухня', 'Винная карта', 'Сезонные меню', 'Персональные рекомендации'],
  greetings: [
    'Рад снова вас видеть! Как я могу сделать ваш день вкуснее?',
    'Добро пожаловать! Готов поделиться кулинарными секретами.',
    'Приветствую в Versal! Давайте создадим что-то особенное сегодня.'
  ],
  personalNotes: [
    'Кстати, сегодня идеальный день для дегустации нашего нового сезонного меню!',
    'Знаете, наш шеф сегодня готовит потрясающее ризотто с трюфелями.',
    'У нас как раз поступило отличное вино из Бордо, которое идеально подойдет к вашим любимым блюдам.',
    'Позвольте отметить, что ваш выбор блюд всегда отличается изысканным вкусом.'
  ]
};

export const generateAIResponse = async (query: string): Promise<AIResponse> => {
  // В реальном приложении здесь будет интеграция с AI-сервисом
  const response: AIResponse = {
    text: '',
    suggestions: [],
    personalNote: '',
    mood: 'friendly'
  };

  // Анализируем запрос и формируем контекстный ответ
  if (query.toLowerCase().includes('вино')) {
    response.text = 'Для выбора идеального вина важно учитывать несколько факторов. Позвольте предложить варианты, которые отлично сочетаются с вашими предпочтениями.';
    response.suggestions = ['Винный этикет: правила и традиции', 'Идеальные винные пары'];
    response.mood = 'professional';
  } else if (query.toLowerCase().includes('меню')) {
    response.text = 'Наше меню постоянно обновляется, учитывая сезонность и пожелания гостей. Вот несколько рекомендаций специально для вас.';
    response.suggestions = ['Сезонное меню: Весна 2024', 'AI-рекомендации: идеальное меню'];
    response.mood = 'enthusiastic';
  }

  // Добавляем персональную ноту
  response.personalNote = versalAI.personalNotes[Math.floor(Math.random() * versalAI.personalNotes.length)];

  // Находим связанные посты
  response.relatedPosts = [...aiPosts, ...manualPosts]
    .filter(post => 
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  return response;
};

export const getRandomGreeting = (): string => {
  return versalAI.greetings[Math.floor(Math.random() * versalAI.greetings.length)];
};

export const generateAIPost = async (topic: string): Promise<BlogPost> => {
  // В реальном приложении здесь будет интеграция с AI-сервисом для генерации контента
  const newPost: BlogPost = {
    id: Date.now(),
    title: `AI-рекомендации: ${topic}`,
    content: `Автоматически сгенерированный контент о ${topic}...`,
    image: '/images/blog/ai-generated.jpg',
    date: new Date().toISOString(),
    author: 'VersalAI',
    category: 'AI-контент',
    aiGenerated: true,
    readingTime: '3 минуты',
    likes: 0
  };

  return newPost;
}; 