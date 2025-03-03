import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Urubots - Sitio oficial',
  description: 'Sitio oficial de Urubots',
  openGraph: {
    title: 'Urubots - Sitio oficial',
    description: 'Equipo de Robótica @utecnorte',
    url: '<https://urubot.uy>',
    siteName: 'Urubots',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/D4D03AQGG1VvB2SBIjg/profile-displayphoto-shrink_800_800/0/1689039906854?e=1697673600&v=beta&t=oZBU4ulLtNVQFi2lJnTa6LNIvXwJc0e1lsBM534XW_M',
        width: 800,
        height: 800,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
