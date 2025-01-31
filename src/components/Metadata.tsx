'use client';

import Head from 'next/head';

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function Metadata({
  title = 'Versal - Ресторан высокой кухни',
  description = 'Изысканная кухня в атмосфере роскоши и комфорта. Авторские блюда от шеф-повара, уникальные интерьеры и безупречный сервис.',
  image = '/images/social/og-image.jpg'
}: MetadataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://versal-restaurant.netlify.app';

  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1A1A1A" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Дополнительные мета-теги */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Versal",
            "image": `${siteUrl}${image}`,
            "description": description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Примерная, 123",
              "addressLocality": "Москва",
              "addressCountry": "RU"
            },
            "servesCuisine": ["Европейская", "Авторская"],
            "priceRange": "₽₽₽",
            "openingHours": "Mo-Su 12:00-23:00",
            "telephone": "+7 (999) 123-45-67",
            "acceptsReservations": "True"
          })
        }}
      />
    </Head>
  );
} 