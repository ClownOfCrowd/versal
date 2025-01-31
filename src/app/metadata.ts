import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Versal - Ресторан высокой кухни',
  description: 'Изысканная кухня, уникальная атмосфера и безупречный сервис в самом сердце города.',
  keywords: 'ресторан, высокая кухня, бронирование столиков, меню, винная карта, шеф-повар',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    title: 'Versal - Ресторан высокой кухни',
    description: 'Изысканная кухня, уникальная атмосфера и безупречный сервис в самом сердце города.',
    images: ['/images/social/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versal - Ресторан высокой кухни',
    description: 'Изысканная кухня, уникальная атмосфера и безупречный сервис в самом сердце города.',
    images: ['/images/social/twitter-card.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#1A1A1A',
}; 