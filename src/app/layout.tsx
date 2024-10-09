import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import '../styles/globals.scss';
import { COLORS } from '../util/colors';
import { locale } from '../util/locale';
import Footer from './components/Footer/Footer';
import Providers from './components/Providers/Providers';
import Loading from './loading';

const meta = {
  siteName: 'Agrow',
  title: 'Agrow – Plataforma de Monitoramento Agrícola em Tempo Real',
  description:
    'Monitore suas lavouras em tempo real com a Agrow. Receba alertas personalizados sobre condições de campo como umidade e temperatura, ajudando a otimizar suas operações agrícolas.',
  image: '/images/logo-profile.png'
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  robots: 'index',
  themeColor: COLORS.primary,
  openGraph: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    type: 'website',
    siteName: meta.siteName
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    card: 'summary',
    images: meta.image
  }
};

const { NEXT_PUBLIC_GTAG: GTAG } = process.env;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id}>
      <body>
        <main>
          <Suspense fallback={<Loading />}>
            <Providers>
              <div className="min-h-[calc(100vh-60px)]">{children}</div>
            </Providers>
            <Footer />
          </Suspense>
        </main>
        <GoogleAnalytics gaId={GTAG} />
      </body>
    </html>
  );
}
