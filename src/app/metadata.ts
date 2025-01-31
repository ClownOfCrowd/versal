import { Metadata } from 'next'

const title = 'Luxury Restaurant - Изысканная кухня в атмосфере роскоши'
const description = 'Погрузитесь в мир высокой кухни в нашем премиальном ресторане. Авторские блюда, уникальные вкусовые сочетания и безупречный сервис.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Luxury Restaurant',
  },
  description,
  keywords: [
    'ресторан премиум класса',
    'высокая кухня',
    'авторская кухня',
    'fine dining',
    'luxury restaurant',
    'бронирование столика',
    'ресторан москва',
  ],
  authors: [{ name: 'Luxury Restaurant' }],
  creator: 'Luxury Restaurant',
  publisher: 'Luxury Restaurant',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title,
    description,
    siteName: 'Luxury Restaurant',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Luxury Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/twitter-image.jpg`],
    creator: '@luxuryrestaurant',
  },
  other: {
    'google-site-verification': 'your-verification-code',
    'yandex-verification': 'your-verification-code',
  },
} 