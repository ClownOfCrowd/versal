'use client';

import Navigation from '@/components/Navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  playfairClass: string;
  loraClass: string;
}

export default function ClientLayout({ children, playfairClass, loraClass }: ClientLayoutProps) {
  return (
    <html lang="ru" className={`${playfairClass} ${loraClass}`}>
      <body className="bg-dark text-white">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
} 