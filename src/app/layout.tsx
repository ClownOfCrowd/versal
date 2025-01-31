import './globals.css';
import { Playfair_Display, Lora } from 'next/font/google';
import Metadata from '@/components/Metadata';
import A11y from '@/components/A11y';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${lora.variable}`}>
      <Metadata />
      <body className="bg-dark text-white min-h-screen">
        <A11y />
        <PerformanceProvider>
          <Navigation />
          <main>{children}</main>
        </PerformanceProvider>
      </body>
    </html>
  );
}
