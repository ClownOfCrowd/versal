import './globals.css';
import { Playfair_Display, Lora } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { PerformanceProvider } from '@/contexts/PerformanceContext';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'Versal - Ресторан высокой кухни',
  description: 'Изысканная кухня, уникальная атмосфера и безупречный сервис в самом сердце города.',
  keywords: 'ресторан, высокая кухня, бронирование столиков, меню, винная карта, шеф-повар',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${lora.variable}`}>
      <body className="bg-dark text-white">
        <PerformanceProvider>
          <Navigation />
          <main>{children}</main>
        </PerformanceProvider>
      </body>
    </html>
  );
}
